// src/components/PasswordModal.tsx
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Lock, Loader2 } from "lucide-react";
import { isIPBlocked, recordFailedAttempt, clearFailedAttempts, getRemainingAttempts, getUserIP, getRemainingBlockTime } from "@/lib/ipBlocking";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  correctPassword: string;
}

const PasswordModal = ({ isOpen, onClose, onSuccess, correctPassword }: PasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(5);

  // Check block status when modal opens
  useEffect(() => {
    if (isOpen) {
      checkBlockStatus();
      updateRemainingAttempts();
    }
  }, [isOpen]);

  // Update remaining time if blocked
  useEffect(() => {
    if (isBlocked) {
      const updateTime = async () => {
        const ip = await getUserIP();
        const time = await getRemainingBlockTime(ip);
        setRemainingTime(time);

        if (time <= 0) {
          setIsBlocked(false);
        }
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);

      return () => clearInterval(interval);
    }
  }, [isBlocked]);

  const checkBlockStatus = async () => {
    try {
      const ip = await getUserIP();
      const blocked = isIPBlocked(ip);
      setIsBlocked(blocked);

      if (blocked) {
        const time = await getRemainingBlockTime(ip);
        setRemainingTime(time);
      }
    } catch (error) {
      console.error("Error checking block status:", error);
    }
  };

  const updateRemainingAttempts = async () => {
    const attempts = await getRemainingAttempts();
    setRemainingAttempts(attempts);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Check if blocked
      if (isBlocked) {
        setError(`Too many failed attempts. Please try again in ${remainingTime} minutes.`);
        setIsLoading(false);
        return;
      }

      // Verify password
      if (password.trim() === correctPassword) {
        // Clear failed attempts on success
        await clearFailedAttempts();

        // Store auth token
        const token = btoa(`${Date.now()}-${Math.random()}`);
        localStorage.setItem("ttr_auth_token", token);
        localStorage.setItem("ttr_auth_timestamp", Date.now().toString());

        setIsLoading(false);
        setPassword("");
        onSuccess();
      } else {
        // Record failed attempt
        const shouldBlock = await recordFailedAttempt();

        if (shouldBlock) {
          setIsBlocked(true);
          const ip = await getUserIP();
          const time = await getRemainingBlockTime(ip);
          setRemainingTime(time);
          setError(`Too many failed attempts. Your access has been blocked for 30 minutes.`);
        } else {
          const attempts = await getRemainingAttempts();
          setRemainingAttempts(attempts);
          setError(`Incorrect password. ${attempts} attempt${attempts !== 1 ? 's' : ''} remaining.`);
        }

        setPassword("");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const formatTime = (minutes: number): string => {
    if (minutes <= 0) return "0 minutes";
    if (minutes === 1) return "1 minute";
    return `${minutes} minutes`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isBlocked && onClose()}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => isBlocked && e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Enter Access Password
          </DialogTitle>
          <DialogDescription>
            {isBlocked
              ? "Your access has been temporarily restricted due to multiple failed attempts."
              : "Enter the password to access the site."
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isBlocked ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <p className="font-semibold mb-1">Access Blocked</p>
                <p>
                  You've exceeded the maximum number of login attempts.
                  Please try again in <strong>{formatTime(remainingTime)}</strong>.
                </p>
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoFocus
                  className="w-full"
                />
                {remainingAttempts < 5 && (
                  <p className="text-sm text-muted-foreground">
                    {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining
                  </p>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading || !password.trim()}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;


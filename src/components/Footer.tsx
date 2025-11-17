const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">TT</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-none">Top Tier</span>
              <span className="text-xs opacity-70">Restoration</span>
            </div>
          </div>

          <div className="text-sm text-center md:text-left opacity-80">
            © {new Date().getFullYear()} Top Tier Restoration. All rights reserved.
          </div>

          <div className="text-sm opacity-80">
            Licensed & Insured
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

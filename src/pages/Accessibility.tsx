import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Eye, MousePointer, Volume2 } from "lucide-react";

const Accessibility = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Accessibility Statement</h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment</h2>
                <p>
                  Top Tier Restoration is committed to ensuring digital accessibility for people with disabilities.
                  We are continually improving the user experience for everyone and applying the relevant accessibility
                  standards to achieve WCAG 2.1 Level AA conformance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Accessibility Standards</h2>
                <p className="mb-4">
                  We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
                  These guidelines explain how to make web content more accessible for people with disabilities
                  and user-friendly for everyone.
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-6">
                  <div className="p-4 bg-muted rounded-lg">
                    <Shield className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-bold text-foreground mb-2">Keyboard Navigation</h3>
                    <p className="text-sm">All interactive elements are accessible via keyboard navigation with visible focus indicators.</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Eye className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-bold text-foreground mb-2">Screen Reader Support</h3>
                    <p className="text-sm">Semantic HTML and ARIA labels ensure compatibility with screen readers.</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <MousePointer className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-bold text-foreground mb-2">Color Contrast</h3>
                    <p className="text-sm">Text and background colors meet WCAG contrast ratio requirements.</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Volume2 className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-bold text-foreground mb-2">Alternative Text</h3>
                    <p className="text-sm">All images include descriptive alt text for users who cannot see them.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Accessibility Features</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Keyboard-accessible navigation throughout the site</li>
                  <li>Visible focus indicators for keyboard users</li>
                  <li>Semantic HTML structure for screen readers</li>
                  <li>Alt text for all images</li>
                  <li>Sufficient color contrast ratios</li>
                  <li>Resizable text (browser zoom support)</li>
                  <li>Reduced motion support for users with motion sensitivity</li>
                  <li>Clickable phone numbers (tel: links)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Known Limitations</h2>
                <p>
                  While we strive to ensure accessibility, there may be some limitations. We are actively working
                  to address these issues and improve accessibility. If you encounter any accessibility barriers,
                  please contact us using the information below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Feedback & Assistance</h2>
                <p className="mb-4">
                  We welcome your feedback on the accessibility of Top Tier Restoration's website. If you encounter
                  accessibility barriers or have suggestions for improvement, please contact us:
                </p>
                <div className="mt-4 p-6 bg-muted rounded-lg">
                  <p className="mb-2"><strong className="text-foreground">Top Tier Restoration</strong></p>
                  <p className="mb-1">
                    <strong className="text-foreground">Email:</strong>{" "}
                    <a href="mailto:info@toptierrestoration.com" className="text-primary hover:underline">
                      info@toptierrestoration.com
                    </a>
                  </p>
                  <p className="mb-1">
                    <strong className="text-foreground">Phone:</strong>{" "}
                    <a href="tel:5551234567" className="text-primary hover:underline">
                      (555) 123-4567
                    </a>
                  </p>
                  <p className="mb-1">
                    <strong className="text-foreground">Service Area:</strong> Indianapolis, Greenwood, and surrounding Indiana areas
                  </p>
                </div>
                <p className="mt-4">
                  We aim to respond to accessibility feedback within 5 business days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Content</h2>
                <p>
                  Our website may include third-party content or links to third-party websites. We do not control
                  the accessibility of third-party content and are not responsible for their accessibility practices.
                  However, we encourage third-party content providers to maintain accessible content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Ongoing Efforts</h2>
                <p>
                  We are committed to maintaining and improving accessibility. Our team regularly reviews our website
                  for accessibility issues and implements improvements. We also conduct periodic accessibility audits
                  to ensure compliance with WCAG standards.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Updates to This Statement</h2>
                <p>
                  We may update this Accessibility Statement from time to time to reflect changes in our practices
                  or for other operational, legal, or regulatory reasons. We will notify users of significant
                  changes by updating the "Last updated" date at the top of this page.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Accessibility;


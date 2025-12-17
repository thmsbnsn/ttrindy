import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CONTACT_INFO } from "@/config/contact";

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
                <p>
                  By accessing or using the Top Tier Restoration website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Services</h2>
                <p className="mb-3">Top Tier Restoration provides professional restoration and remodeling services including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Water damage restoration</li>
                  <li>Fire damage restoration</li>
                  <li>Storm damage repair</li>
                  <li>Complete remodeling services</li>
                </ul>
                <p className="mt-3">
                  All services are provided in accordance with applicable Indiana state laws and regulations. We are licensed and insured to perform restoration and remodeling work in the state of Indiana.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Use License</h2>
                <p className="mb-3">Permission is granted to temporarily access the materials on Top Tier Restoration's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Service Estimates and Quotes</h2>
                <p>
                  All estimates and quotes provided by Top Tier Restoration are subject to change based on actual conditions discovered during work. Final pricing will be provided in writing before work begins. Estimates are valid for 30 days from the date of issue unless otherwise stated.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Payment Terms</h2>
                <p className="mb-3">Payment terms will be specified in your service agreement. Generally:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment is due upon completion of work unless other arrangements are made in writing</li>
                  <li>We accept cash, check, and major credit cards</li>
                  <li>For insurance claims, we work directly with your insurance company when authorized</li>
                  <li>Late payments may be subject to interest charges as permitted by Indiana law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Warranty and Guarantees</h2>
                <p>
                  Top Tier Restoration stands behind our work with appropriate warranties as specified in your service agreement. All work is performed in accordance with industry standards and applicable building codes. Specific warranty terms will be provided in writing with your service agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by Indiana law, Top Tier Restoration shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services or website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Insurance and Licensing</h2>
                <p className="mb-3">
                  Top Tier Restoration is fully licensed, bonded, and insured in the state of Indiana. We maintain general liability insurance and workers' compensation insurance as required by Indiana law. Proof of insurance is available upon request.
                </p>
                <p className="mb-3">
                  <strong>Indiana Contractor License:</strong> {CONTACT_INFO.license}
                </p>
                <p>
                  All restoration and remodeling work is performed in accordance with Indiana Home Improvement Contractors Act and applicable state and local building codes. We are registered with the Indiana Professional Licensing Agency.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Dispute Resolution</h2>
                <p>
                  Any disputes arising from these Terms of Service or our services shall be resolved in accordance with Indiana state law. Disputes will be subject to the exclusive jurisdiction of the courts located in Indiana. We encourage customers to contact us directly to resolve any concerns before pursuing legal action.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Modifications to Terms</h2>
                <p>
                  Top Tier Restoration reserves the right to revise these Terms of Service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="mb-2"><strong>Top Tier Restoration</strong></p>
                  <p className="mb-1">Email: {CONTACT_INFO.email.display}</p>
                  <p className="mb-1">Contact: <Link to={CONTACT_INFO.contactFormUrl} className="text-primary hover:underline">Contact Us</Link></p>
                  <p>Service Area: Greater {CONTACT_INFO.address.city} Metro Area, {CONTACT_INFO.address.state}</p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;


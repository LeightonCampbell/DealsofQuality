import { Facebook, Twitter, Linkedin, Instagram, Phone, MessageSquare, MapPin } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const sectionId = href.substring(2);
      
      if (location.pathname === "/") {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  const services = [
    { label: "TV Mounting", href: "/services/tv-mounting" },
    { label: "Computers & Printers", href: "/services/computers-printers" },
    { label: "Wi-Fi & Network", href: "/services/wifi-network" },
    { label: "Home Security", href: "/services/home-security" },
    { label: "Audio & Video", href: "/services/audio-video" },
    { label: "Smart Home", href: "/services/smart-home" },
    { label: "Business Services", href: "/services/business" },
  ];

  const quickLinks = [
    { label: "FAQs", href: "/#faq" },
    { label: "Blog", href: "/blog" },
    { label: "Join as a Pro", href: "https://www.dealsofquality.com/provider-request8c944202", external: true },
    { label: "Remote Support", href: "/remote-support" },
    { label: "Contact Us", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/doquality", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/dealsofquality", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/doquality/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/doquality", label: "Instagram" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="section-padding !py-16">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-6">
                <img src={logo} alt="DoQuality" className="h-10 w-auto brightness-0 invert" />
              </Link>
              <p className="text-background/70 mb-6 leading-relaxed">
                Your trusted partner for premium home services and smart technology needs.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-background/10 hover:bg-accent flex items-center justify-center transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <nav aria-label="Services">
              <h3 className="font-display font-bold text-lg mb-5">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.label}>
                    <Link
                      to={service.href}
                      className="text-background/70 hover:text-accent transition-colors duration-200"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Quick Links Column */}
            <nav aria-label="Quick links">
              <h3 className="font-display font-bold text-lg mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-background/70 hover:text-accent transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : link.href.startsWith("/#") ? (
                      <a
                        href={link.href}
                        className="text-background/70 hover:text-accent transition-colors duration-200"
                        onClick={(e) => handleAnchorClick(e, link.href)}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-background/70 hover:text-accent transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Column */}
            <div>
              <h3 className="font-display font-bold text-lg mb-5">Contact Us</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+18185847389"
                    className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors"
                  >
                    <Phone className="w-5 h-5 text-accent" />
                    (818) 584-7389
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors"
                  >
                    <MessageSquare className="w-5 h-5 text-accent" />
                    Send us a message
                  </Link>
                </li>
                <li className="flex items-start gap-3 text-background/70">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Serving Customers Nationwide</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10 py-6">
        <div className="container-max px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">
              Deals of Quality, LLC | Copyright © {new Date().getFullYear()}. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link to="/terms" className="text-background/50 hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-background/50 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

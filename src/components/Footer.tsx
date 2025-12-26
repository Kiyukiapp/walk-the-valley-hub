import { Link } from "react-router-dom";
import { Youtube, Linkedin, Apple, Music } from "lucide-react";
import wtvLogoWhite from "@/assets/images/branding/wtv-logo-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Episodes", href: "/episodes" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { 
      name: "YouTube", 
      href: "https://www.youtube.com/@WalkTheValley", 
      icon: Youtube 
    },
    { 
      name: "LinkedIn", 
      href: "https://www.linkedin.com/company/walk-the-valley", 
      icon: Linkedin 
    },
    { 
      name: "Apple Podcasts", 
      href: "https://podcasts.apple.com/dm/podcast/walk-the-valley/id1791839096", 
      icon: Apple 
    },
    { 
      name: "Spotify", 
      href: "https://creators.spotify.com/pod/profile/katalin-vikuk/", 
      icon: Music 
    },
  ];

  return (
    <footer style={{ backgroundColor: 'hsl(var(--footer-dark-green))' }} className="border-t border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={wtvLogoWhite} 
                alt="Walk The Valley Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-white">Walk The Valley</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              A podcast series filled with real-world advice from healthcare innovation entrepreneurs 
              navigating the challenging journey from discovery to commercialization.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Listen On */}
          <div>
            <h3 className="font-semibold text-white mb-4">Listen On</h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-white/80 hover:text-white transition-colors group"
                  >
                    <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/80">
            © {currentYear} Walk The Valley. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
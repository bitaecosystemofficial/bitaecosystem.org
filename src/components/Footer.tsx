import { Link, useLocation } from "react-router-dom";
import { Facebook, Twitter, Youtube, Send, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import bitAccessLogo from "@/assets/bit-access-logo.png";
import metamaskLogo from "@/assets/metamask-logo.png";
import trustWalletLogo from "@/assets/trust-wallet-logo.png";
const Footer = () => {
  const { isConnected } = useAccount();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
    },
    {
      icon: Twitter,
      href: "#",
      label: "X (Twitter)",
    },
    {
      icon: Youtube,
      href: "#",
      label: "YouTube",
    },
    {
      icon: Send,
      href: "#",
      label: "Telegram",
    },
    {
      icon: Github,
      href: "#",
      label: "GitHub",
    },
  ];
  const importantLinks = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/overview",
      label: "Overview",
    },
    {
      path: "/ecosystem",
      label: "Ecosystem",
    },
    {
      path: "/integrators",
      label: "Integrators",
    },
  ];
  const helpdeskLinks = [
    {
      path: "/helpdesk#docs",
      label: "Documentation",
    },
    {
      path: "/helpdesk#faq",
      label: "FAQ",
    },
    {
      path: "/helpdesk#privacy",
      label: "Privacy Policy",
    },
    {
      path: "/helpdesk#terms",
      label: "Terms of Use",
    },
  ];

  // If connected and on dashboard, hide footer on mobile
  if (isConnected) {
    return (
      <footer className="bg-card border-t border-border mt-20">
        <div className="container mx-auto px-4 py-6">
          <div
            className={`flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left ${isDashboard ? "hidden md:flex" : "flex"}`}
          >
            <p className="text-sm text-muted-foreground">
              Copyright © 2024 - 2025. Bit Access Ecosystem. All Rights Reserved
            </p>
            <p className="text-sm text-muted-foreground">Powered by Binance Smart Chain Network</p>
          </div>
        </div>
      </footer>
    );
  }

  // Full footer when not connected
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={bitAccessLogo} alt="Bit Access Logo" className="w-10 h-10" />
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary">Bit Access</span>
                <span className="text-sm text-muted-foreground">(BIT)</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bridging traditional business and blockchain technology. We empower users with seamless crypto
              transactions, enable consumers to access digital assets effortlessly, and provide merchants with
              innovative payment solutions. Join the global movement revolutionizing everyday transactions through
              secure, transparent, and borderless Web3 ecosystems.
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Important Links</h3>
            <ul className="space-y-2">
              {importantLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpdesk Links */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Helpdesk</h3>
            <ul className="space-y-2">
              {helpdeskLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Office Location */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-2">Office Location</h4>
              <p className="text-sm text-muted-foreground">To be announced on official FB Page</p>
            </div>

            {/* Wallet Support */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4 font-semibold">Supported Wallets</p>
              <div className="flex items-center gap-4">
                <motion.a
                  href="https://metamask.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-white p-2 shadow-md group-hover:shadow-lg group-hover:shadow-orange-500/50 transition-all">
                    <img src={metamaskLogo} alt="MetaMask logo" className="w-full h-full" />
                  </div>
                  <span className="text-xs font-medium text-foreground/70 group-hover:text-orange-500 transition-colors">
                    MetaMask
                  </span>
                </motion.a>

                <motion.a
                  href="https://trustwallet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-white p-2 shadow-md group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                    <img src={trustWalletLogo} alt="Trust Wallet logo" className="w-full h-full" />
                  </div>
                  <span className="text-xs font-medium text-foreground/70 group-hover:text-blue-500 transition-colors">
                    Trust Wallet
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col items-start space-y-2">
            <p className="text-sm text-muted-foreground">
              Copyright © 2024 - 2025. Bit Access Ecosystem. All Rights Reserved
            </p>
            <p className="text-sm text-muted-foreground">Crafted with ❤️ by Bit Access Dev Team</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

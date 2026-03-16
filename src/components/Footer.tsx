"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    icon: FiGithub,
    label: "GitHub",
    href: process.env.NEXT_PUBLIC_GITHUB_URL || "#",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
  },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-h4 gradient-text font-jetbrains-mono tracking-widest uppercase mb-2">Arpit Kumawat</h3>
            <p className="text-body text-slate">
              Architecting Intelligence. Mastering Time & Code.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-light font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-slate hover:text-accent-cyan transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-slate-light font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="text-slate hover:text-accent-cyan transition-colors p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-small text-slate text-center sm:text-left">
              © {currentYear} Arpit Kumawat. All rights reserved.
            </p>
            <p className="text-small text-slate">
              Built with{" "}
              <span className="text-accent-cyan">Next.js</span>,{" "}
              <span className="text-gold">Framer Motion</span>, and{" "}
              <span className="text-accent-cyan">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

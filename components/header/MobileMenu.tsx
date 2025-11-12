"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-1 -mr-1"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-3 py-3 space-y-1">
            <a
              href="/about"
              className="block text-foreground hover:text-primary hover:bg-orange-50 py-2 px-3 rounded transition text-sm"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#products"
              className="block text-foreground hover:text-primary hover:bg-orange-50 py-2 px-3 rounded transition text-sm"
              onClick={() => setIsOpen(false)}
            >
              Products
            </a>
            <a
              href="#contact"
              className="block text-foreground hover:text-primary hover:bg-orange-50 py-2 px-3 rounded transition text-sm"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <Link
              href="/agritechimentoradmin"
              className="block bg-orange-600 text-white hover:bg-orange-700 py-2 px-3 rounded transition font-medium text-sm"
              onClick={() => setIsOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

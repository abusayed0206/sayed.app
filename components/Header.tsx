"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/feed", label: "Feed" },
    { href: "/personal-feed", label: "Personal" },
    { href: "/redirect", label: "Redirect" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Header - Indie Style */}
      <header className=" bg-white dark:bg-black sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 text-sm">
              {navLinks.map((link, index) => (
                <span key={link.href}>
                  {index > 0 && <span className="text-black dark:text-white mr-4">•</span>}
                  <Link
                    href={link.href}
                    className={`text-black dark:text-white ${
                      isActive(link.href)
                        ? "underline"
                        : "hover:underline"
                    }`}
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-black dark:text-white underline hover:no-underline text-sm"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-black dark:text-white text-sm underline hover:no-underline"
              aria-label="Toggle theme"
            >
              {isDark ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-100 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="relative z-101 bg-white dark:bg-black h-full flex flex-col">
            {/* Menu Header */}
            <div className="border-b border-black dark:border-white px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-black dark:text-white text-sm underline hover:no-underline"
              >
                Close
              </button>
              <button
                onClick={toggleTheme}
                className="text-black dark:text-white text-sm underline hover:no-underline"
                aria-label="Toggle theme"
              >
                {isDark ? "Light" : "Dark"}
              </button>
            </div>
            
            {/* Menu Items */}
            <nav className="px-6 py-8">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-black dark:text-white text-xl block ${
                        isActive(link.href)
                          ? "underline"
                          : "hover:underline"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

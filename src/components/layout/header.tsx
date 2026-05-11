"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, LayoutPanelTop, X, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "What We Do" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "group relative text-sm font-semibold transition-colors duration-300",
          isActive
            ? "text-orange-600"
            : "text-gray-600 hover:text-orange-600"
        )}
      >
        {label}
        {/* Animated underline */}
        <span
          className={cn(
            "absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300",
            isActive ? "w-full" : "w-0 group-hover:w-full"
          )}
        />
      </Link>
    );
  };

  return (
    <>
      <style>{`
        @keyframes mobile-nav-in {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .mobile-nav-link { animation: mobile-nav-in 0.4s ease forwards; }
      `}</style>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-gray-200/80 bg-white/90 shadow-lg shadow-gray-900/5 backdrop-blur-md"
            : "border-b border-transparent bg-white/70 backdrop-blur-md"
        )}
      >
        {/* Gradient accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 opacity-80" />

        <div className="container relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-105"
          >
            {!logoError ? (
              <Image
                src="/quadrantlogo.png"
                alt="RaQuadrant"
                width={52}
                height={52}
                className="h-12 w-auto object-contain sm:h-14"
                priority
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30 transition-shadow duration-300 group-hover:shadow-orange-500/50 sm:h-14 sm:w-14">
                <LayoutPanelTop className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
            )}
            <span className="font-headline text-xl font-bold text-gray-900">
              RaQuadrant
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
            <Link href="/contact" className="ml-2">
              <Button
                size="sm"
                className="group/btn font-headline gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-white shadow-md shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/40 hover:from-orange-600 hover:to-amber-600"
              >
                Get in touch
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Button>
            </Link>
          </nav>

          {/* Mobile menu trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-gray-600 transition-colors hover:bg-orange-50 hover:text-orange-600"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-[300px] border-l-4 border-orange-500/30 bg-white/98 backdrop-blur-xl sm:max-w-xs"
            >
              <div className="flex h-full flex-col pt-2">
                <div className="border-b border-gray-200 pb-4">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center gap-2"
                  >
                    {!logoError ? (
                      <Image
                        src="/quadrantlogo.png"
                        alt="RaQuadrant"
                        width={52}
                        height={52}
                        className="h-12 w-auto object-contain sm:h-14"
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white sm:h-14 sm:w-14">
                        <LayoutPanelTop className="h-6 w-6 sm:h-7 sm:w-7" />
                      </div>
                    )}
                    <span className="font-headline text-lg font-bold text-gray-900">
                      RaQuadrant
                    </span>
                  </Link>
                </div>
                <nav className="mt-8 flex flex-col gap-1">
                  {navItems.map((item, i) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "mobile-nav-link rounded-xl px-4 py-3 text-base font-semibold transition-colors hover:bg-orange-50 hover:text-orange-600",
                        pathname === item.href
                          ? "bg-orange-50 text-orange-600"
                          : "text-gray-700"
                      )}
                      style={{ animationDelay: `${(i + 1) * 60}ms` }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mobile-nav-link mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.02] hover:shadow-orange-500/40"
                    style={{
                      animationDelay: `${(navItems.length + 1) * 60}ms`,
                    }}
                  >
                    Get in touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { headerNavLinks } from "@/data/navigation";
import ListItem from "./ListItem";
import MobileMenu from "./MobileMenu";
// Statički import: URL dobiva hash sadržaja, pa se izmjena loga odmah vidi
import logoBrand from "../../../public/assets/logo/arctis-logo-brand.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Tanka linija napretka čitanja na dnu headera
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-lg transition-shadow duration-300 supports-[backdrop-filter]:bg-white/80",
        scrolled
          ? "border-slate-200/80 shadow-[0_4px_24px_-12px_rgba(15,23,42,0.25)]"
          : "border-transparent",
      )}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"
        style={{ scaleX: progress }}
      />
      <div className="container flex h-16 items-center mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 flex-shrink-0"
        >
          <Image
            src={logoBrand}
            alt="Arctis"
            priority
            sizes="123px"
            className="h-11 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              {headerNavLinks
                .filter((navItem) => navItem.href !== "/contact")
                .map((navItem) => (
                <NavigationMenuItem key={navItem.label}>
                  {!navItem.sublinks ? (
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive(navItem.href) && "text-blue-700",
                      )}
                    >
                      <Link
                        href={navItem.href}
                        aria-current={isActive(navItem.href) ? "page" : undefined}
                      >
                        {navItem.label}
                      </Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          navItem.sublinks.some((s) => isActive(s.href)) &&
                            "text-blue-700",
                        )}
                      >
                        {navItem.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-1 p-3 md:w-[420px]">
                          {navItem.sublinks.map((subItem) => (
                            <ListItem
                              key={subItem.label}
                              title={subItem.label}
                              href={subItem.href}
                            >
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Button asChild size="sm" className="ml-2 rounded-full px-5">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>

        <div className="flex items-center lg:hidden ml-auto">
          <MobileMenu isActive={isActive} />
        </div>
      </div>
    </header>
  );
};

export default Header;

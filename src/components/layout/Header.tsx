"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { headerNavLinks } from "@/data/navigation";
import ListItem from "./ListItem";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 flex-shrink-0"
        >
          <Image
            src="/assets/logo/arctis-logo-blue.png"
            alt="Arctis Logo"
            width={90}
            height={30}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              {headerNavLinks
                .filter((navItem) => navItem.href !== "/contact")
                .map((navItem) => (
                <NavigationMenuItem key={navItem.label}>
                  {!navItem.sublinks ? (
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href={navItem.href}>{navItem.label}</Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger>
                        {navItem.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
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

        <div className="flex items-center md:hidden ml-auto">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] [&>button:first-of-type]:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src="/assets/logo/arctis-logo-blue.png"
                    alt="Arctis Logo"
                    width={80}
                    height={26}
                  />
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col space-y-1">
                {headerNavLinks.map((navItem) => (
                  <div key={navItem.label}>
                    {!navItem.sublinks ? (
                      <SheetClose asChild>
                        <Link
                          href={navItem.href}
                          className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent"
                        >
                          {navItem.label}
                        </Link>
                      </SheetClose>
                    ) : (
                      <div className="pl-4">
                        <span className="block px-3 py-1 text-base font-medium text-muted-foreground">
                          {navItem.label}
                        </span>
                        {navItem.sublinks.map((sub) => (
                          <SheetClose asChild key={sub.label}>
                            <Link
                              href={sub.href}
                              className="block pl-6 pr-3 py-1 rounded-md text-base font-medium text-foreground hover:bg-accent"
                            >
                              {sub.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

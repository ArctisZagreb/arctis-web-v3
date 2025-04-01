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
import { cn } from "@/lib/utils";
import { headerNavLinks } from "@/data/navigation";
import ListItem from "./ListItem";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 flex-shrink-0"
        >
          <Image
            src="/assets/logo/arctis-logo-blue.png" // Koristi logo iz public/assets
            alt="Arctis Logo"
            width={90} // Prilagodi dimenzije prema potrebi
            height={30} // Prilagodi dimenzije
            priority // Učitaj logo prioritetno
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-end">
          <NavigationMenu>
            <NavigationMenuList>
              {headerNavLinks.map((navItem) => (
                <NavigationMenuItem key={navItem.label}>
                  {/* Ako nema sublinks, to je običan link */}
                  {!navItem.sublinks ? (
                    <Link href={navItem.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {navItem.label}
                      </NavigationMenuLink>
                    </Link>
                  ) : (
                    // Ako ima sublinks, koristi Trigger i Content
                    <>
                      <NavigationMenuTrigger>
                        {navItem.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          {/* Opcionalna prva, veća stavka (npr. link na glavnu stranicu sekcije) */}
                          {/* <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href={navItem.href} // Glavni link za sekciju ako postoji
                              >
                                 <div className="mb-2 mt-4 text-lg font-medium">
                                  {navItem.label} Overview
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                   Brief description of the whole section...
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li> */}

                          {/* Mapiraj sublinks koristeći ListItem komponentu */}
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
        </div>

        {/* Mobile Menu Button & Sheet */}
        <div className="flex items-center md:hidden ml-auto">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
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
                      // Prikazujemo samo glavni link za sekciju na mobitelu, bez dropdowna
                      /*  <SheetClose asChild>
                        <span
                          // Možeš dodati onClick event ovdje ako želiš neku akciju
                          className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent cursor-default"
                        >
                          {navItem.label}
                        </span>
                      </SheetClose> */

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

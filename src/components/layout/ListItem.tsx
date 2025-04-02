// src/components/layout/ListItem.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

// Definiramo props koje ListItem prima
interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  href: string; // Osigurajmo da je href uvijek prisutan
}

// Koristimo React.forwardRef za prosljeđivanje ref-a ako je potrebno
const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        {/* NavigationMenuLink je komponenta iz shadcn/ui koja radi s Next.js Linkom */}
        <NavigationMenuLink asChild>
          <Link
            href={href}
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            {/* Djeca komponente se koriste za prikaz opisa */}
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem"; // Dobra praksa za debugging

export default ListItem;

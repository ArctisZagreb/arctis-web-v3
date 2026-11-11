// src/components/layout/ListItem.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
              "group/item block select-none rounded-lg p-3 no-underline outline-none transition-colors hover:bg-slate-50 focus:bg-slate-50",
              className
            )}
            {...props}
          >
            <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-900 group-hover/item:text-blue-700">
              {title}
              <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-blue-600 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
            </div>
            {/* Djeca komponente se koriste za prikaz opisa */}
            <p className="mt-1 line-clamp-2 text-sm leading-snug text-slate-500">
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

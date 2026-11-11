// src/components/sections/SimpleCallToAction.tsx
import React from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteInfo } from "@/data/siteInfo";
import { cn } from "@/lib/utils";

interface SimpleCallToActionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  className?: string;
}

const SimpleCallToAction: React.FC<SimpleCallToActionProps> = ({
  title = "Ready to Streamline Your Projects?",
  subtitle = "Let's discuss how our project management expertise can help you achieve your goals. Get in touch with our team today.",
  buttonText = "Contact Us",
  className,
}) => {
  return (
    <section
      className={cn(
        "relative isolate w-full overflow-hidden bg-[#050b1f] py-20 text-white md:py-24",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000_30%,transparent_100%)]" />
        <div className="absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 text-center md:px-6">
        <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-12 bg-blue-500 px-6 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-400"
          >
            <Link href="/contact">
              {buttonText}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-white/20 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white"
          >
            <a href={siteInfo.emailHref}>
              <Mail className="mr-1 h-4 w-4" />
              {siteInfo.email}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SimpleCallToAction;

import React from "react";
import { PageHero } from "@/components/ui/page-hero";

interface FaqHeaderProps {
  title?: string;
  subtitle?: string;
}

const FaqHeader: React.FC<FaqHeaderProps> = ({
  title = "Frequently asked questions",
  subtitle = "Find answers to common questions about ARCHIBUS, our services, and related topics.",
}) => <PageHero eyebrow="FAQ" title={title} description={subtitle} />;

export default FaqHeader;

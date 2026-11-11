// src/components/privacy-policy/PrivacyPolicyHeader.tsx
import React from "react";
import { PageHero } from "@/components/ui/page-hero";

interface PrivacyPolicyHeaderProps {
  title?: string;
  subtitle?: string;
}

const PrivacyPolicyHeader: React.FC<PrivacyPolicyHeaderProps> = ({
  title = "Privacy Policy",
  subtitle = "Understanding how we collect, use, and protect your information.",
}) => (
  <PageHero
    eyebrow="Privacy Policy"
    title={title}
    description={subtitle}
    size="compact"
  />
);

export default PrivacyPolicyHeader;

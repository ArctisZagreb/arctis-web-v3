import React from "react";
import { Metadata } from "next";
import PrivacyPolicyHeader from "@/components/privacy-policy/PrivacyPolicyHeader";
import PrivacyPolicyContent from "@/components/privacy-policy/PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Arctis d.o.o.",
  description:
    "Read the Privacy Policy for Arctis d.o.o. to understand how we handle your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      <PrivacyPolicyHeader />

      <main className="flex-1 bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <PrivacyPolicyContent />
        </div>
      </main>
    </div>
  );
}

import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Building,
  Banknote,
  ShieldCheck,
} from "lucide-react";
import { siteInfo, contactPageContent } from "@/data/siteInfo";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";

// Page metadata
export const metadata: Metadata = {
  title: "Contact Us | IWMS & ARCHIBUS Solutions",
  description:
    "Get in touch with Arctis d.o.o. in Zagreb. Find our contact details, address, legal information and Data Protection Officer contact. We are experts in ARCHIBUS IWMS.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  // Format IBAN with spaces for readability
  const formatIban = (iban: string) => {
    return iban.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <PageHero
        eyebrow="Contact"
        title={contactPageContent.title}
        description={contactPageContent.subtitle}
      >
        <Button
          asChild
          size="lg"
          className="h-12 bg-blue-500 px-6 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-400"
        >
          <a href={siteInfo.emailHref}>
            <Mail className="mr-1 h-4 w-4" />
            {siteInfo.email}
          </a>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-12 border-white/20 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white"
        >
          <a href={siteInfo.phoneHref}>
            <Phone className="mr-1 h-4 w-4" />
            {siteInfo.phone}
          </a>
        </Button>
      </PageHero>

      {/* Main Content */}
      <div className="flex-1 py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-16">
            {/* Column 1: Introduction and Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Let&apos;s Connect
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {contactPageContent.introParagraph}
                </p>
                <p className="text-gray-700 font-medium">
                  {contactPageContent.ctaPrompt}
                </p>
              </div>

              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                  Contact Details
                </h3>
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Address</p>
                    <a
                      href={siteInfo.addressLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-700 transition-colors"
                    >
                      {siteInfo.address}
                    </a>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Phone</p>
                    <a
                      href={siteInfo.phoneHref}
                      className="text-gray-600 hover:text-blue-700 transition-colors"
                    >
                      {siteInfo.phone}
                    </a>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <a
                      href={siteInfo.emailHref}
                      className="text-gray-600 hover:text-blue-700 transition-colors"
                    >
                      {siteInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* GDPR / Data Protection Officer */}
              <div
                id="data-protection"
                className="scroll-mt-24 rounded-xl border border-blue-100 bg-blue-50/60 p-5 space-y-3"
              >
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  {siteInfo.dataProtection.title} (GDPR)
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {siteInfo.dataProtection.description}
                </p>
                <a
                  href={siteInfo.dataProtection.emailHref}
                  className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline break-all"
                >
                  <Mail className="h-4 w-4 mr-1.5 flex-shrink-0" />
                  {siteInfo.dataProtection.email}
                </a>
                <p className="text-xs text-gray-500">
                  See our{" "}
                  <Link
                    href="/privacy-policy"
                    className="underline hover:text-blue-700"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for more information.
                </p>
              </div>
            </div>

            {/* Column 2: Map and Legal Info */}
            <div className="lg:col-span-2 space-y-10">
              {/* Map */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Our Location
                </h3>
                <div className="aspect-video overflow-hidden rounded-lg shadow-md border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2780.7764598669132!2d15.95853491577551!3d45.81573511793828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d6e01307784b%3A0x28a7a9941c528e74!2sArctis%20d.o.o.!5e0!3m2!1sen!2shr!4v1621414850053!5m2!1sen!2shr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Arctis d.o.o. Google Maps Location"
                  ></iframe>
                </div>
              </div>

              {/* Legal and Bank Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Legal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                    <Building className="h-5 w-5 mr-2 text-indigo-600" /> Legal
                    Information
                  </h3>
                  <InfoItem label="Company Name" value={siteInfo.companyName} />
                  <InfoItem
                    label="Managing Director"
                    value={siteInfo.legal.director}
                  />
                  <InfoItem
                    label="Registered Court"
                    value={siteInfo.legal.court}
                  />
                  <InfoItem label="MBS" value={siteInfo.legal.mbs} />
                  <InfoItem label="MB" value={siteInfo.legal.mb} />
                  <InfoItem label="OIB / VAT ID" value={siteInfo.legal.oib} />
                  <InfoItem
                    label="Share Capital"
                    value={`${siteInfo.legal.capital} (${siteInfo.legal.capitalPaid ? "fully paid" : "partially paid"})`}
                  />
                </div>

                {/* Bank Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                    <Banknote className="h-5 w-5 mr-2 text-green-600" /> Bank
                    Details
                  </h3>
                  <InfoItem label="Bank Name" value={siteInfo.bank.name} />
                  <InfoItem
                    label="Bank Address"
                    value={siteInfo.bank.address}
                  />
                  <InfoItem
                    label="IBAN"
                    value={formatIban(siteInfo.bank.iban)}
                    isMonospace={true}
                  />
                  <InfoItem
                    label="BIC"
                    value={formatIban(siteInfo.bank.bic)}
                    isMonospace={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for displaying information items
const InfoItem = ({
  label,
  value,
  isMonospace = false,
}: {
  label: string;
  value?: string | null;
  isMonospace?: boolean;
}) => {
  if (!value) return null;
  return (
    <div className="text-sm">
      <p className="font-medium text-gray-500 mb-0.5">{label}</p>
      <p
        className={`text-gray-700 ${isMonospace ? "font-mono tracking-tight" : ""}`}
      >
        {value}
      </p>
    </div>
  );
};

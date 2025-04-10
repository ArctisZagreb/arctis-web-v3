import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { siteInfo } from "@/data/siteInfo";

const PrivacyPolicyContent = () => {
  return (
    <article
      className={cn(
        "prose prose-slate lg:prose-lg max-w-none",
        "prose-headings:font-semibold prose-headings:text-gray-800",
        "prose-a:text-blue-600 hover:prose-a:text-blue-800",
        "prose-strong:text-gray-800"
      )}
    >
      <p>
        <strong>Effective Date:</strong> April 10, 2025
      </p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to the Arctis d.o.o. website. This Privacy Policy explains our
        approach to privacy on this website (
        {process.env.NEXT_PUBLIC_SITE_URL || "arctis.hr"}). Arctis d.o.o. is
        committed to protecting your privacy.
      </p>
      <p>
        This website serves solely for informational purposes about our company,
        services, and the ARCHIBUS platform.
      </p>

      <h2>2. Information We Do Not Collect</h2>
      <p>
        We value your privacy. This website is designed to provide information
        without actively collecting personal data from its visitors.
        Specifically:
      </p>
      <ul>
        <li>
          <strong>No Contact Forms or Submissions:</strong> We do not include
          contact forms, comment sections, or any other features that directly
          solicit personal information through this website.
        </li>
        <li>
          <strong>No User Accounts:</strong> Registration or user account
          creation is not required or available on this site.
        </li>
        <li>
          <strong>No Tracking Cookies:</strong> We do not use cookies for
          tracking user behavior, analytics (like Google Analytics), or
          advertising purposes. Any cookies used are strictly necessary for the
          basic functionality or security of the website platform itself, and
          these do not collect personal identifiers.
        </li>
        <li>
          <strong>No IP Address Logging for Tracking:</strong> While web servers
          inherently log IP addresses for security and operational purposes, we
          do not use this information to identify or track individual users or
          their browsing habits.
        </li>
        <li>
          <strong>No Third-Party Data Sharing for Marketing:</strong> Since we
          do not collect personal data for marketing, we do not share such data
          with third parties for those purposes.
        </li>
      </ul>
      <p>
        Essentially, your visit to this website is anonymous from our data
        collection perspective.
      </p>

      <h2>3. Information Collected by Hosting Providers</h2>
      <p>
        Please be aware that our web hosting provider may collect standard
        server logs, which might include IP addresses, browser types, and
        timestamps. This data is typically collected for security monitoring,
        diagnosing technical problems, and maintaining the server
        infrastructure. This data is generally aggregated and not used by us to
        identify individual visitors. Refer to our hosting provider&apos;s
        privacy policy for more details on their data handling practices.
      </p>

      <h2>4. Links to Other Websites</h2>
      <p>
        Our website may contain links to other websites (e.g., ARCHIBUS website,
        client websites). This Privacy Policy applies only to our website. We
        are not responsible for the privacy practices of other sites. We
        encourage you to read the privacy policies of any external websites you
        visit.
      </p>

      <h2>5. Data Security</h2>
      <p>
        Although we do not actively collect personal data through the website,
        we implement reasonable technical and administrative measures to protect
        the website itself from unauthorized access or security breaches.
      </p>

      <h2>6. Children&apos;s Privacy</h2>
      <p>
        This website is not intended for children under the age of 16 (or the
        relevant age of consent in your jurisdiction). We do not knowingly
        collect any information from children.
      </p>

      <h2>7. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated effective date. We encourage you to
        review this policy periodically.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or our practices,
        please contact us:
      </p>
      <ul>
        <li>
          By email: <a href={siteInfo.emailHref}>{siteInfo.email}</a>
        </li>
        <li>
          By phone: <a href={siteInfo.phoneHref}>{siteInfo.phone}</a>
        </li>
        <li>By mail: {siteInfo.address}</li>
        <li>
          Via our <Link href="/contact">Contact Page</Link>
        </li>
      </ul>
    </article>
  );
};

export default PrivacyPolicyContent;

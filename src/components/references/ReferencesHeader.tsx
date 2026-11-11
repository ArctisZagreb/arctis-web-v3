import React from "react";
import { PageHero } from "@/components/ui/page-hero";

interface ReferencesHeaderProps {
  title?: string;
  subtitle?: string;
}

const ReferencesHeader: React.FC<ReferencesHeaderProps> = ({
  title = "Our work & references",
  subtitle = "Explore successful projects and valued clients Arctis has collaborated with, showcasing our expertise in IWMS and ARCHIBUS.",
}) => <PageHero eyebrow="References" title={title} description={subtitle} />;

export default ReferencesHeader;

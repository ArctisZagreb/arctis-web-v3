import { Code, Cpu, Database, GitBranch, Monitor, Server } from "lucide-react";

export const techCategories = [
  {
    title: "Programming & Frameworks",
    Icon: Code,
    groups: [
      {
        name: "Frontend",
        items: ["JavaScript", "TypeScript", "React", "Angular", "Next.js"],
      },
      { name: "Backend", items: ["Python", "Node.js", "Java", "C#"] },
    ],
  },
  {
    title: "Databases",
    Icon: Database,
    groups: [
      { name: "SQL", items: ["PostgreSQL", "MySQL", "SQL Server", "Oracle"] },
      {
        name: "NoSQL",
        items: ["MongoDB", "Redis", "Elasticsearch", "Cassandra"],
      },
    ],
  },
  {
    title: "Infrastructure & DevOps",
    Icon: Server,
    groups: [
      {
        name: "Cloud",
        items: ["AWS", "Azure", "Google Cloud", "Docker", "Digital Ocean"],
      },
      {
        name: "Tools",
        items: ["Kubernetes", "Jenkins", "Terraform", "Ansible"],
      },
    ],
  },
  {
    title: "Source Control & CI/CD",
    Icon: GitBranch,
    groups: [
      {
        name: "Version Control",
        items: ["Git", "GitHub", "GitLab", "Bitbucket", "SVN"],
      },
      {
        name: "CI/CD",
        items: ["GitHub Actions", "GitLab CI", "CircleCI", "Jenkins"],
      }, // Jenkins može biti i ovdje
    ],
  },
  {
    title: "Design & UI/UX",
    Icon: Monitor,
    groups: [
      {
        name: "Design Tools",
        items: ["Figma", "Adobe XD", "Sketch", "Photoshop"],
      },
      {
        name: "UI Frameworks",
        items: ["Tailwind CSS", "Bootstrap", "Material UI", "Shadcn/ui"],
      }, // Dodan Shadcn
    ],
  },
  {
    title: "Specialized Expertise",
    Icon: Cpu,
    groups: [
      {
        name: "IWMS & BIM",
        items: ["ARCHIBUS", "Autodesk Revit", "AutoCAD", "BIM 360", "Forge"],
      }, // Dodan Forge
      { name: "Analytics", items: ["Power BI", "Tableau", "Qlik", "Looker"] },
    ],
  },
];

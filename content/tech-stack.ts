import type { TechGroup } from "@/lib/types";

export const techStack: TechGroup[] = [
  {
    area: { en: "Frontend", bn: "ফ্রন্টএন্ড" },
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    area: { en: "Backend", bn: "ব্যাকএন্ড" },
    items: ["Laravel", "NestJS", "Node.js"],
  },
  {
    area: { en: "CMS and e-commerce", bn: "CMS ও ই-কমার্স" },
    items: ["WordPress", "WooCommerce"],
  },
  {
    area: { en: "Databases", bn: "ডেটাবেস" },
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    area: { en: "DevOps and cloud", bn: "DevOps ও ক্লাউড" },
    items: ["Docker", "Nginx", "AWS", "GitHub Actions"],
  },
];

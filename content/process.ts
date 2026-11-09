import type { ProcessStep } from "@/lib/types";

/** Our delivery process. Order matters: rendered as a numbered sequence. */
export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "We learn how your business works today, what slows it down and what the software must do.",
  },
  {
    title: "Plan and design",
    description:
      "You get a written scope, screen designs and a timeline to approve before any code is written.",
  },
  {
    title: "Develop",
    description:
      "We build in short cycles and show you working software regularly, so feedback comes early.",
  },
  {
    title: "Test and QA",
    description:
      "Each feature is tested on phones and computers, with real-world data, before it reaches your users.",
  },
  {
    title: "Deploy",
    description:
      "We launch on reliable hosting with backups and monitoring, and train your team to use it.",
  },
  {
    title: "Support and grow",
    description:
      "After launch we fix issues, keep everything updated and add features as your business changes.",
  },
];

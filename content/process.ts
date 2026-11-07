import type { ProcessStep } from "@/lib/types";

/** Our delivery process. Order matters: rendered as a numbered sequence. */
export const processSteps: ProcessStep[] = [
  {
    title: { en: "Discover", bn: "জানা ও বোঝা" },
    description: {
      en: "We learn how your business works today, what slows it down and what the software must do.",
      bn: "আপনার ব্যবসা এখন কীভাবে চলে, কোথায় সমস্যা হয় এবং সফটওয়্যারটির কী করা দরকার, তা আমরা বুঝে নিই।",
    },
  },
  {
    title: { en: "Plan and design", bn: "পরিকল্পনা ও ডিজাইন" },
    description: {
      en: "You get a written scope, screen designs and a timeline to approve before any code is written.",
      bn: "কোড লেখার আগেই আপনি লিখিত স্কোপ, স্ক্রিন ডিজাইন ও সময়সূচি দেখে অনুমোদন দেবেন।",
    },
  },
  {
    title: { en: "Develop", bn: "ডেভেলপমেন্ট" },
    description: {
      en: "We build in short cycles and show you working software regularly, so feedback comes early.",
      bn: "আমরা ছোট ছোট ধাপে কাজ করি এবং নিয়মিত চালু সফটওয়্যার দেখাই, যাতে শুরু থেকেই আপনার মতামত নেওয়া যায়।",
    },
  },
  {
    title: { en: "Test and QA", bn: "টেস্ট ও মান যাচাই" },
    description: {
      en: "Each feature is tested on phones and computers, with real-world data, before it reaches your users.",
      bn: "প্রতিটি ফিচার ব্যবহারকারীর কাছে যাওয়ার আগে ফোন ও কম্পিউটারে, বাস্তব ডেটা দিয়ে পরীক্ষা করা হয়।",
    },
  },
  {
    title: { en: "Deploy", bn: "ডিপ্লয়" },
    description: {
      en: "We launch on reliable hosting with backups and monitoring, and train your team to use it.",
      bn: "ব্যাকআপ ও মনিটরিংসহ নির্ভরযোগ্য হোস্টিংয়ে চালু করি এবং আপনার টিমকে ব্যবহার শেখাই।",
    },
  },
  {
    title: { en: "Support and grow", bn: "সাপোর্ট ও উন্নয়ন" },
    description: {
      en: "After launch we fix issues, keep everything updated and add features as your business changes.",
      bn: "চালুর পরেও আমরা সমস্যা সমাধান করি, সবকিছু আপডেট রাখি এবং ব্যবসার প্রয়োজনে নতুন ফিচার যোগ করি।",
    },
  },
];

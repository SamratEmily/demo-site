import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "custom-web-applications",
    icon: "app-window",
    title: {
      en: "Custom web applications",
      bn: "কাস্টম ওয়েব অ্যাপ্লিকেশন",
    },
    summary: {
      en: "Dashboards, portals and internal tools built around how your team already works.",
      bn: "আপনার টিম যেভাবে কাজ করে, সেভাবেই তৈরি ড্যাশবোর্ড, পোর্টাল ও অভ্যন্তরীণ টুল।",
    },
  },
  {
    slug: "api-development",
    icon: "plug",
    title: {
      en: "APIs and integrations",
      bn: "API ও ইন্টিগ্রেশন",
    },
    summary: {
      en: "Documented APIs for your web and mobile apps, and connections to payment, SMS and other services you rely on.",
      bn: "আপনার ওয়েব ও মোবাইল অ্যাপের জন্য ডকুমেন্টেড API, আর পেমেন্ট, SMS ও অন্যান্য সার্ভিসের সাথে সংযোগ।",
    },
  },
  {
    slug: "e-commerce",
    icon: "shopping-cart",
    title: {
      en: "E-commerce",
      bn: "ই-কমার্স",
    },
    summary: {
      en: "Online stores with product catalogs, carts, online payments and order management your staff can run day to day.",
      bn: "প্রোডাক্ট ক্যাটালগ, কার্ট, অনলাইন পেমেন্ট ও অর্ডার ম্যানেজমেন্টসহ অনলাইন স্টোর, যা আপনার স্টাফ প্রতিদিন চালাতে পারবেন।",
    },
  },
  {
    slug: "wordpress",
    icon: "panels-top-left",
    title: {
      en: "WordPress and WooCommerce",
      bn: "WordPress ও WooCommerce",
    },
    summary: {
      en: "Websites your team can update without a developer, custom themes and plugins, and WooCommerce stores.",
      bn: "ডেভেলপার ছাড়াই আপনার টিম আপডেট করতে পারবে এমন ওয়েবসাইট, কাস্টম থিম ও প্লাগইন, এবং WooCommerce স্টোর।",
    },
  },
  {
    slug: "maintenance-support",
    icon: "wrench",
    title: {
      en: "Maintenance and support",
      bn: "রক্ষণাবেক্ষণ ও সাপোর্ট",
    },
    summary: {
      en: "Bug fixes, security updates, speed improvements and new features for software you already use, including software we didn't build.",
      bn: "আপনার চলমান সফটওয়্যারের বাগ ঠিক করা, সিকিউরিটি আপডেট, গতি বাড়ানো ও নতুন ফিচার যোগ, অন্য কারও তৈরি সফটওয়্যারও।",
    },
  },
  {
    slug: "cloud-devops",
    icon: "server",
    title: {
      en: "Deployment and hosting setup",
      bn: "ডিপ্লয়মেন্ট ও হোস্টিং সেটআপ",
    },
    summary: {
      en: "Servers, Docker, automated deployments and backups set up so releases are repeatable and your site stays online.",
      bn: "সার্ভার, Docker, অটোমেটেড ডিপ্লয়মেন্ট ও ব্যাকআপ সেটআপ, যাতে প্রতিটি রিলিজ নির্ভরযোগ্য হয় এবং সাইট সবসময় চালু থাকে।",
    },
  },
];

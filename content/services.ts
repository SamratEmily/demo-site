import type { Service } from "@/lib/types";

/*
 * [TODO: confirm each service's description, what's included and technologies]
 * Technologies are taken from content/tech-stack.ts.
 */
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
    description: {
      en: "When spreadsheets and off-the-shelf software no longer fit, we build a web application around your actual workflow: who enters what, who approves it and which reports you need at the end of the day. It runs in the browser, so your team can use it from the office, from home or on a phone.",
      bn: "যখন স্প্রেডশিট বা রেডিমেড সফটওয়্যার আর কাজে লাগে না, তখন আমরা আপনার আসল কাজের ধারা অনুযায়ী ওয়েব অ্যাপ্লিকেশন তৈরি করি: কে কী তথ্য দেবেন, কে অনুমোদন করবেন, আর দিনের শেষে কোন রিপোর্ট দরকার। এটি ব্রাউজারে চলে, তাই আপনার টিম অফিস, বাসা বা ফোন থেকেও ব্যবহার করতে পারে।",
    },
    included: [
      {
        en: "Workshops to map your process and agree on a written scope",
        bn: "আপনার কাজের ধারা বুঝতে আলোচনা এবং লিখিত স্কোপ চূড়ান্ত করা",
      },
      {
        en: "Screen designs you review before development starts",
        bn: "ডেভেলপমেন্ট শুরুর আগে আপনার দেখে নেওয়ার জন্য স্ক্রিন ডিজাইন",
      },
      {
        en: "User roles and permissions, so each person sees only what they need",
        bn: "ইউজার রোল ও পারমিশন, যাতে প্রত্যেকে শুধু তাঁর প্রয়োজনীয় অংশ দেখেন",
      },
      {
        en: "Reports and exports to Excel or PDF",
        bn: "রিপোর্ট এবং Excel বা PDF-এ এক্সপোর্ট",
      },
      {
        en: "Bangla and English interface where you need it",
        bn: "প্রয়োজনে বাংলা ও ইংরেজি ইন্টারফেস",
      },
      {
        en: "Training for your team and handover documents",
        bn: "আপনার টিমের প্রশিক্ষণ ও হস্তান্তরের ডকুমেন্ট",
      },
    ],
    technologies: ["Laravel", "NestJS", "React", "Next.js", "TypeScript", "MySQL", "PostgreSQL"],
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
    description: {
      en: "We build the backend that your website, mobile app or partners talk to, and connect your software to the services you already use, such as payment gateways, SMS providers and accounting tools. Every API comes with documentation your developers can follow.",
      bn: "আপনার ওয়েবসাইট, মোবাইল অ্যাপ বা পার্টনাররা যে ব্যাকএন্ডের সাথে যোগাযোগ করে, আমরা তা তৈরি করি এবং পেমেন্ট গেটওয়ে, SMS প্রোভাইডার ও অ্যাকাউন্টিং টুলের মতো আপনার ব্যবহৃত সার্ভিসের সাথে আপনার সফটওয়্যার যুক্ত করি। প্রতিটি API-এর সাথে থাকে এমন ডকুমেন্টেশন, যা আপনার ডেভেলপাররা সহজে অনুসরণ করতে পারেন।",
    },
    included: [
      {
        en: "REST API design and development",
        bn: "REST API ডিজাইন ও ডেভেলপমেন্ট",
      },
      {
        en: "Login, access tokens and rate limits",
        bn: "লগইন, অ্যাক্সেস টোকেন ও রেট লিমিট",
      },
      {
        en: "Integration with payment gateways, SMS and email services",
        bn: "পেমেন্ট গেটওয়ে, SMS ও ইমেইল সার্ভিসের সাথে ইন্টিগ্রেশন",
      },
      {
        en: "API documentation and example requests",
        bn: "API ডকুমেন্টেশন ও উদাহরণসহ রিকোয়েস্ট",
      },
      {
        en: "Automated tests for the main endpoints",
        bn: "প্রধান এন্ডপয়েন্টগুলোর অটোমেটেড টেস্ট",
      },
    ],
    technologies: ["Laravel", "NestJS", "Node.js", "PostgreSQL", "MySQL", "Redis"],
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
    description: {
      en: "We build online stores that your staff can run without calling a developer: adding products, changing prices, handling orders and refunds. Customers can pay online or on delivery, and you see every order and its status in one place.",
      bn: "আমরা এমন অনলাইন স্টোর তৈরি করি, যা আপনার স্টাফ ডেভেলপার ছাড়াই চালাতে পারবেন: প্রোডাক্ট যোগ, দাম পরিবর্তন, অর্ডার ও রিফান্ড সামলানো। কাস্টমার অনলাইনে বা ক্যাশ অন ডেলিভারিতে পেমেন্ট করতে পারেন, আর আপনি প্রতিটি অর্ডার ও তার অবস্থা এক জায়গায় দেখতে পান।",
    },
    included: [
      {
        en: "Product catalog with categories, variants and stock",
        bn: "ক্যাটাগরি, ভ্যারিয়েন্ট ও স্টকসহ প্রোডাক্ট ক্যাটালগ",
      },
      {
        en: "Cart, checkout and online payment or cash on delivery",
        bn: "কার্ট, চেকআউট এবং অনলাইন পেমেন্ট বা ক্যাশ অন ডেলিভারি",
      },
      {
        en: "Order management with status updates for customers",
        bn: "কাস্টমারকে স্ট্যাটাস জানানোসহ অর্ডার ম্যানেজমেন্ট",
      },
      {
        en: "Discount codes and delivery charges by area",
        bn: "ডিসকাউন্ট কোড ও এলাকাভিত্তিক ডেলিভারি চার্জ",
      },
      {
        en: "Sales reports",
        bn: "বিক্রয়ের রিপোর্ট",
      },
    ],
    technologies: ["WooCommerce", "Laravel", "Next.js", "MySQL"],
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
    description: {
      en: "For company websites, news sites and smaller stores, WordPress lets your team publish pages and posts on their own. We build custom themes that load quickly, write plugins when you need something WordPress can't do, and keep the number of third-party plugins low so the site stays secure.",
      bn: "কোম্পানির ওয়েবসাইট, নিউজ সাইট বা ছোট অনলাইন স্টোরের জন্য WordPress ব্যবহার করলে আপনার টিম নিজেরাই পেজ ও পোস্ট প্রকাশ করতে পারে। আমরা দ্রুত লোড হয় এমন কাস্টম থিম তৈরি করি, WordPress-এ যা নেই তার জন্য প্লাগইন লিখি, এবং বাইরের প্লাগইন কম রাখি যাতে সাইট নিরাপদ থাকে।",
    },
    included: [
      {
        en: "Custom theme built from your design",
        bn: "আপনার ডিজাইন অনুযায়ী কাস্টম থিম",
      },
      {
        en: "Custom plugins for features WordPress doesn't have",
        bn: "WordPress-এ নেই এমন ফিচারের জন্য কাস্টম প্লাগইন",
      },
      {
        en: "WooCommerce store setup",
        bn: "WooCommerce স্টোর সেটআপ",
      },
      {
        en: "Bangla and English content",
        bn: "বাংলা ও ইংরেজি কনটেন্ট",
      },
      {
        en: "Training so your team can update the site",
        bn: "আপনার টিম যাতে সাইট আপডেট করতে পারে সেজন্য প্রশিক্ষণ",
      },
    ],
    technologies: ["WordPress", "WooCommerce", "MySQL", "Nginx"],
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
    description: {
      en: "Software needs care after launch. We fix bugs, apply security updates, make slow pages faster and add features as your business changes. If another team built your software, we start by reviewing the code and telling you plainly what state it is in.",
      bn: "লঞ্চের পরেও সফটওয়্যারের যত্ন দরকার। আমরা বাগ ঠিক করি, সিকিউরিটি আপডেট দিই, ধীর পেজ দ্রুত করি এবং আপনার ব্যবসার প্রয়োজনে নতুন ফিচার যোগ করি। আপনার সফটওয়্যার অন্য কোনো টিম তৈরি করে থাকলে, আমরা প্রথমে কোড রিভিউ করি এবং এর অবস্থা আপনাকে সোজাসুজি জানাই।",
    },
    included: [
      {
        en: "Code review and a written report for software we didn't build",
        bn: "অন্যের তৈরি সফটওয়্যারের কোড রিভিউ ও লিখিত রিপোর্ট",
      },
      {
        en: "Bug fixes and security updates",
        bn: "বাগ ঠিক করা ও সিকিউরিটি আপডেট",
      },
      {
        en: "Speed improvements",
        bn: "গতি বাড়ানো",
      },
      {
        en: "Small new features and changes",
        bn: "ছোট নতুন ফিচার ও পরিবর্তন",
      },
      {
        en: "Regular backups and uptime checks",
        bn: "নিয়মিত ব্যাকআপ ও সাইট চালু আছে কি না তা পরীক্ষা",
      },
    ],
    technologies: ["Laravel", "WordPress", "React", "Node.js", "MySQL"],
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
    description: {
      en: "We set up the servers your software runs on and the steps that put new versions live, so a release is one predictable step instead of a late-night manual job. Backups run on a schedule, and you get a short document explaining how everything is set up.",
      bn: "আপনার সফটওয়্যার যে সার্ভারে চলে এবং নতুন ভার্সন লাইভ করার ধাপগুলো আমরা সেটআপ করি, যাতে রিলিজ মানে রাত জেগে হাতে কাজ নয়, বরং একটি নির্ভরযোগ্য ধাপ। নির্দিষ্ট সময়ে ব্যাকআপ হয়, আর সবকিছু কীভাবে সেটআপ করা আছে তার একটি ছোট ডকুমেন্ট আপনাকে দেওয়া হয়।",
    },
    included: [
      {
        en: "Server setup on AWS or your existing hosting",
        bn: "AWS বা আপনার বর্তমান হোস্টিংয়ে সার্ভার সেটআপ",
      },
      {
        en: "Docker containers for consistent environments",
        bn: "সব জায়গায় একই পরিবেশের জন্য Docker কন্টেইনার",
      },
      {
        en: "Automated deployments from your code repository",
        bn: "কোড রিপোজিটরি থেকে অটোমেটেড ডিপ্লয়মেন্ট",
      },
      {
        en: "SSL certificates and basic security hardening",
        bn: "SSL সার্টিফিকেট ও প্রাথমিক নিরাপত্তা ব্যবস্থা",
      },
      {
        en: "Scheduled backups and a setup document",
        bn: "নির্ধারিত ব্যাকআপ ও সেটআপ ডকুমেন্ট",
      },
    ],
    technologies: ["Docker", "Nginx", "AWS", "GitHub Actions"],
  },
];

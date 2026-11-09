import type { HomeContent } from "@/lib/types";

/** Marketing copy for the Home page. Button and link labels live in messages/*.json. */
export const home: HomeContent = {
  hero: {
    title: {
      en: "We build the software your business runs on.",
      bn: "আপনার ব্যবসা চালানোর সফটওয়্যার আমরা তৈরি করি।",
    },
    intro: {
      en: "Beacon Soft builds custom web applications, APIs, online stores and WordPress sites for businesses in Bangladesh and abroad, and keeps them running after launch.",
      bn: "Beacon Soft বাংলাদেশ ও দেশের বাইরের ব্যবসার জন্য কাস্টম ওয়েব অ্যাপ্লিকেশন, API, অনলাইন স্টোর ও WordPress সাইট তৈরি করে, এবং চালুর পরেও সেগুলো সচল রাখে।",
    },
    caption: {
      en: "Gari Becho, our vehicle shop management software",
      bn: "Gari Becho, আমাদের তৈরি গাড়ির শোরুম ব্যবস্থাপনা সফটওয়্যার",
    },
  },
  services: {
    title: { en: "What we do", bn: "আমরা যা করি" },
    intro: {
      en: "From a first version of a new product to keeping an existing system healthy.",
      bn: "নতুন প্রোডাক্টের প্রথম সংস্করণ থেকে শুরু করে চলমান সিস্টেম সচল রাখা পর্যন্ত।",
    },
  },
  spotlight: {
    title: { en: "Built by us, used every day", bn: "আমাদের তৈরি, প্রতিদিন ব্যবহৃত" },
    languagesNote: {
      en: "Works in English and Bangla, on phone and computer.",
      bn: "ইংরেজি ও বাংলায়, ফোন ও কম্পিউটারে চলে।",
    },
  },
  products: {
    title: { en: "Our products", bn: "আমাদের প্রোডাক্ট" },
    intro: {
      en: "Ready-made software we build and maintain, for businesses with common needs.",
      bn: "একই ধরনের প্রয়োজনের ব্যবসার জন্য আমাদের তৈরি ও রক্ষণাবেক্ষণ করা রেডিমেড সফটওয়্যার।",
    },
  },
  process: {
    title: { en: "How we work", bn: "আমরা যেভাবে কাজ করি" },
    intro: {
      en: "Six steps, with your approval before each big decision.",
      bn: "ছয়টি ধাপ, প্রতিটি বড় সিদ্ধান্তের আগে আপনার অনুমোদন নিয়ে।",
    },
  },
  aiDevelopment: {
    title: { en: "AI-driven development", bn: "AI-চালিত ডেভেলপমেন্ট" },
    intro: {
      en: "A smarter way to build and improve your products: we use AI at every stage, from first idea to launch, so you get working software sooner without cutting corners.",
      bn: "প্রোডাক্ট তৈরি ও উন্নত করার আরও স্মার্ট উপায়: প্রথম ধারণা থেকে চালু করা পর্যন্ত প্রতিটি ধাপে আমরা AI ব্যবহার করি, তাই মানের সঙ্গে আপস না করেই আপনি দ্রুত কাজের সফটওয়্যার পান।",
    },
    points: [
      {
        icon: "app-window",
        title: { en: "Working versions sooner", bn: "দ্রুত চালু সংস্করণ" },
        description: {
          en: "AI helps us turn your requirements into screens and code quickly, so you can try a working version early and tell us what to change.",
          bn: "AI-এর সাহায্যে আমরা আপনার প্রয়োজনকে দ্রুত স্ক্রিন ও কোডে রূপ দিই, যাতে আপনি আগেভাগে একটি চালু সংস্করণ ব্যবহার করে দেখতে এবং কী বদলাতে হবে জানাতে পারেন।",
        },
      },
      {
        icon: "shield-check",
        title: { en: "Checked by our engineers", bn: "ইঞ্জিনিয়ারদের যাচাই করা" },
        description: {
          en: "Every line of code AI suggests is read, tested and approved by our engineers before it goes into your product.",
          bn: "AI যে কোড প্রস্তাব করে, তার প্রতিটি লাইন আমাদের ইঞ্জিনিয়াররা পড়ে, টেস্ট করে ও অনুমোদন দিয়ে তবেই আপনার প্রোডাক্টে যোগ করেন।",
        },
      },
      {
        icon: "file-check",
        title: { en: "More testing, fewer bugs", bn: "বেশি টেস্ট, কম বাগ" },
        description: {
          en: "We use AI to write and run more tests and to catch problems early, so fewer bugs reach the people using your software.",
          bn: "AI দিয়ে আমরা আরও বেশি টেস্ট লিখি ও চালাই এবং সমস্যা আগেই ধরি, তাই আপনার সফটওয়্যার ব্যবহারকারীদের কাছে কম বাগ পৌঁছায়।",
        },
      },
    ],
  },
  team: {
    title: { en: "Meet the team", bn: "আমাদের টিম" },
    intro: {
      en: "The people who plan, build and support your software.",
      bn: "যাঁরা আপনার সফটওয়্যার পরিকল্পনা, তৈরি ও সাপোর্ট করেন।",
    },
  },
  testimonials: {
    title: { en: "What our clients say", bn: "ক্লায়েন্টরা যা বলেন" },
  },
  cta: {
    title: { en: "Tell us what you need to build", bn: "কী তৈরি করতে চান, আমাদের জানান" },
    intro: {
      en: "Share a short description of your project. We'll reply with questions, a rough plan and a quote.",
      bn: "প্রজেক্টের সংক্ষিপ্ত বিবরণ পাঠান। আমরা প্রশ্ন, একটি প্রাথমিক পরিকল্পনা ও কোটেশন নিয়ে উত্তর দেব।",
    },
  },
};

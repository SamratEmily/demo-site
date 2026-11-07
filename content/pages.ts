import type { Localized } from "@/lib/types";

interface PageCopy {
  title: Localized;
  intro: Localized;
  /** Used for <meta name="description"> and social previews. */
  metaDescription: Localized;
}

export const productsPage: PageCopy & {
  liveTitle: Localized;
  inDevelopmentTitle: Localized;
  inDevelopmentIntro: Localized;
} = {
  title: { en: "Our products", bn: "আমাদের প্রোডাক্ট" },
  intro: {
    en: "Ready-made software we build and maintain for businesses with common needs. Each one can be adjusted to how your business works.",
    bn: "একই ধরনের প্রয়োজনের ব্যবসার জন্য আমাদের তৈরি ও রক্ষণাবেক্ষণ করা রেডিমেড সফটওয়্যার। প্রতিটি আপনার ব্যবসার ধরন অনুযায়ী সাজিয়ে নেওয়া যায়।",
  },
  metaDescription: {
    en: "Software products by Beacon Soft: Gari Becho vehicle shop management, plus inventory, IELTS, laundry POS and university admission software.",
    bn: "Beacon Soft-এর সফটওয়্যার প্রোডাক্ট: Gari Becho গাড়ির শোরুম ব্যবস্থাপনা, এবং ইনভেন্টরি, IELTS, লন্ড্রি POS ও বিশ্ববিদ্যালয় ভর্তি সফটওয়্যার।",
  },
  liveTitle: { en: "Available now", bn: "এখন ব্যবহার করা যাচ্ছে" },
  inDevelopmentTitle: { en: "In development", bn: "তৈরির কাজ চলছে" },
  inDevelopmentIntro: {
    en: "These products are being built. Request a demo to tell us what you need, and we'll keep you updated.",
    bn: "এই প্রোডাক্টগুলো তৈরি হচ্ছে। আপনার প্রয়োজন জানাতে ডেমোর অনুরোধ করুন, আমরা আপনাকে আপডেট জানাব।",
  },
};

export const servicesPage: PageCopy & {
  includedTitle: Localized;
  technologiesTitle: Localized;
  ctaTitle: Localized;
  ctaBody: Localized;
} = {
  title: { en: "Services", bn: "সার্ভিস" },
  intro: {
    en: "We design, build and look after web software for businesses. Here is what each service covers, so you know what to expect before we talk.",
    bn: "আমরা ব্যবসার জন্য ওয়েব সফটওয়্যার ডিজাইন, তৈরি ও রক্ষণাবেক্ষণ করি। প্রতিটি সার্ভিসে কী থাকে তা এখানে দেওয়া আছে, যাতে কথা বলার আগেই আপনি জানেন কী আশা করবেন।",
  },
  metaDescription: {
    en: "Custom web applications, APIs and integrations, e-commerce, WordPress, maintenance and hosting setup by Beacon Soft Ltd in Bangladesh.",
    bn: "Beacon Soft Ltd-এর সার্ভিস: কাস্টম ওয়েব অ্যাপ্লিকেশন, API ও ইন্টিগ্রেশন, ই-কমার্স, WordPress, রক্ষণাবেক্ষণ ও হোস্টিং সেটআপ।",
  },
  includedTitle: { en: "What's included", bn: "যা থাকছে" },
  technologiesTitle: { en: "Typical technologies", bn: "সাধারণত যে প্রযুক্তি ব্যবহার করি" },
  ctaTitle: { en: "Not sure which service you need?", bn: "কোন সার্ভিস দরকার বুঝতে পারছেন না?" },
  ctaBody: {
    en: "Tell us what you want to get done. We'll suggest an approach and send you a written estimate.",
    bn: "আপনি কী করতে চান আমাদের জানান। আমরা একটি উপায় প্রস্তাব করব এবং লিখিত খরচের হিসাব পাঠাব।",
  },
};

export const caseStudiesPage: PageCopy & { emptyNote: Localized } = {
  title: { en: "Case studies", bn: "কেস স্টাডি" },
  intro: {
    en: "How our software is used by real businesses: the problem they had, what we built and what changed.",
    bn: "বাস্তব ব্যবসায় আমাদের সফটওয়্যার কীভাবে ব্যবহার হচ্ছে: তাদের সমস্যা কী ছিল, আমরা কী তৈরি করেছি এবং কী বদলেছে।",
  },
  metaDescription: {
    en: "Case studies from Beacon Soft Ltd: the challenge, our solution and the results for businesses using our software.",
    bn: "Beacon Soft Ltd-এর কেস স্টাডি: আমাদের সফটওয়্যার ব্যবহারকারী ব্যবসার চ্যালেঞ্জ, আমাদের সমাধান ও ফলাফল।",
  },
  emptyNote: {
    en: "We are writing up our first case studies. In the meantime, ask us for references.",
    bn: "আমরা প্রথম কেস স্টাডিগুলো লিখছি। এর মধ্যে রেফারেন্সের জন্য আমাদের সাথে যোগাযোগ করুন।",
  },
};

export const aboutPage: PageCopy & {
  storyTitle: Localized;
  story: Localized[];
  missionTitle: Localized;
  mission: Localized;
  valuesTitle: Localized;
  teamTitle: Localized;
  teamIntro: Localized;
  companyTitle: Localized;
  ctaTitle: Localized;
  ctaBody: Localized;
} = {
  title: { en: "About Beacon Soft", bn: "Beacon Soft সম্পর্কে" },
  intro: {
    en: "We are a software company in Bangladesh. We build our own products and custom software for businesses, and we keep supporting it after launch.",
    bn: "আমরা বাংলাদেশের একটি সফটওয়্যার কোম্পানি। আমরা নিজেদের প্রোডাক্ট এবং ব্যবসার জন্য কাস্টম সফটওয়্যার তৈরি করি, আর লঞ্চের পরেও সাপোর্ট দিয়ে যাই।",
  },
  metaDescription: {
    en: "About Beacon Soft Ltd: our story, mission, the values we work by and company details.",
    bn: "Beacon Soft Ltd সম্পর্কে: আমাদের গল্প, লক্ষ্য, কাজের মূল্যবোধ ও কোম্পানির তথ্য।",
  },
  storyTitle: { en: "Our story", bn: "আমাদের গল্প" },
  // [TODO: add the founding year and how the company started]
  story: [
    {
      en: "Many businesses in Bangladesh still run on notebooks, spreadsheets and phone calls. We started Beacon Soft to build software that fits how these businesses actually work, in the language their staff use every day.",
      bn: "বাংলাদেশের অনেক ব্যবসা এখনো খাতা, স্প্রেডশিট আর ফোনকলের উপর চলে। এসব ব্যবসা আসলে যেভাবে কাজ করে, এবং তাদের স্টাফ প্রতিদিন যে ভাষা ব্যবহার করেন, সেই অনুযায়ী সফটওয়্যার তৈরি করতেই আমরা Beacon Soft শুরু করেছি।",
    },
    {
      en: "Our first live product, Gari Becho, replaced the paper records of vehicle shops with one system for stock, sales, installments and investors, in Bangla and English. We are now building products for inventory, IELTS preparation, laundries and university admission, alongside custom projects for clients.",
      bn: "আমাদের প্রথম লাইভ প্রোডাক্ট Gari Becho গাড়ির শোরুমের কাগজের হিসাবের বদলে স্টক, বিক্রয়, কিস্তি ও ইনভেস্টরের জন্য একটি সিস্টেম এনেছে, বাংলা ও ইংরেজি দুই ভাষাতেই। এখন আমরা ক্লায়েন্টদের কাস্টম প্রজেক্টের পাশাপাশি ইনভেন্টরি, IELTS প্রস্তুতি, লন্ড্রি ও বিশ্ববিদ্যালয় ভর্তির জন্য প্রোডাক্ট তৈরি করছি।",
    },
  ],
  missionTitle: { en: "Our mission", bn: "আমাদের লক্ষ্য" },
  mission: {
    en: "To build reliable, easy-to-use software that helps businesses keep accurate records, save time and make decisions with clear numbers.",
    bn: "নির্ভরযোগ্য ও সহজে ব্যবহারযোগ্য সফটওয়্যার তৈরি করা, যা ব্যবসাকে সঠিক হিসাব রাখতে, সময় বাঁচাতে এবং পরিষ্কার তথ্যের ভিত্তিতে সিদ্ধান্ত নিতে সাহায্য করে।",
  },
  valuesTitle: { en: "How we work", bn: "আমরা যেভাবে কাজ করি" },
  teamTitle: { en: "Our team", bn: "আমাদের টিম" },
  teamIntro: {
    en: "The people who design, build and support our software.",
    bn: "যাঁরা আমাদের সফটওয়্যার ডিজাইন, তৈরি ও সাপোর্ট করেন।",
  },
  companyTitle: { en: "Company details", bn: "কোম্পানির তথ্য" },
  ctaTitle: { en: "Let's talk about your project", bn: "আপনার প্রজেক্ট নিয়ে কথা বলি" },
  ctaBody: {
    en: "Tell us what you need. We'll reply with questions or a plan, not a sales pitch.",
    bn: "আপনার কী দরকার আমাদের জানান। আমরা সেলস পিচ নয়, প্রশ্ন বা একটি পরিকল্পনা নিয়ে উত্তর দেব।",
  },
};

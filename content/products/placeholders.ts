import type { Product } from "@/lib/types";

/*
 * [TODO: confirm everything in this file]
 * Products 2–5 use sensible placeholder copy until the real details are
 * confirmed: status, summary, problem, features, audience and screenshots.
 * No screenshots, results, FAQ or technologies are listed, so those
 * sections stay hidden on their pages.
 */

export const inventoryManagement: Product = {
  slug: "inventory-management",
  name: "Inventory Management System",
  status: "in-development",
  icon: "boxes",
  category: { en: "Inventory and stock control", bn: "ইনভেন্টরি ও স্টক নিয়ন্ত্রণ" },
  summary: {
    en: "Tracks products, stock levels, purchases and sales across one or more locations, with low-stock alerts and stock reports.",
    bn: "এক বা একাধিক জায়গায় প্রোডাক্ট, স্টক, ক্রয় ও বিক্রয়ের হিসাব রাখে, স্টক কমে গেলে জানায় এবং স্টক রিপোর্ট দেয়।",
  },
  problem: {
    en: "When stock is counted by hand or in spreadsheets, popular items run out without warning, slow items take up space, and nobody is sure what the warehouse really holds.",
    bn: "হাতে গুনে বা স্প্রেডশিটে স্টকের হিসাব রাখলে জনপ্রিয় পণ্য হঠাৎ শেষ হয়ে যায়, কম চলা পণ্য জায়গা দখল করে থাকে, আর গুদামে আসলে কী আছে কেউ নিশ্চিত জানে না।",
  },
  features: [
    {
      icon: "package",
      title: { en: "Products and stock levels", bn: "প্রোডাক্ট ও স্টকের পরিমাণ" },
      description: {
        en: "See current stock for every product and location in one list.",
        bn: "প্রতিটি প্রোডাক্ট ও জায়গার বর্তমান স্টক এক তালিকায় দেখুন।",
      },
    },
    {
      icon: "bell",
      title: { en: "Low-stock alerts", bn: "স্টক কমার সতর্কতা" },
      description: {
        en: "Get notified before an item runs out, so you can reorder in time.",
        bn: "পণ্য শেষ হওয়ার আগেই জানুন, যাতে সময়মতো আবার অর্ডার দিতে পারেন।",
      },
    },
    {
      icon: "chart",
      title: { en: "Stock reports", bn: "স্টক রিপোর্ট" },
      description: {
        en: "Reports on stock value, movement and slow-moving items.",
        bn: "স্টকের মূল্য, আসা-যাওয়া ও কম চলা পণ্যের রিপোর্ট।",
      },
    },
  ],
  audience: [
    { en: "Retail shops and wholesalers", bn: "খুচরা দোকান ও পাইকারি বিক্রেতা" },
    {
      en: "Businesses with a warehouse or several outlets",
      bn: "যাঁদের গুদাম বা একাধিক আউটলেট আছে",
    },
  ],
};

export const ieltsPlatform: Product = {
  slug: "ielts-platform",
  name: "IELTS Platform",
  status: "in-development",
  icon: "graduation-cap",
  category: { en: "Online IELTS preparation", bn: "অনলাইন IELTS প্রস্তুতি" },
  summary: {
    en: "Lets students practise IELTS reading, listening, writing and speaking online, and lets teachers manage tests and follow each student's progress.",
    bn: "শিক্ষার্থীরা অনলাইনে IELTS রিডিং, লিসেনিং, রাইটিং ও স্পিকিং অনুশীলন করতে পারে, আর শিক্ষকরা টেস্ট পরিচালনা ও প্রত্যেকের অগ্রগতি দেখতে পারেন।",
  },
  problem: {
    en: "IELTS coaching centres often run mock tests on paper, which takes hours to mark and makes it hard to see where each student needs more practice.",
    bn: "অনেক IELTS কোচিং সেন্টার কাগজে মক টেস্ট নেয়, যা খাতা দেখতে ঘণ্টার পর ঘণ্টা লাগে এবং কোন শিক্ষার্থীর কোথায় বেশি অনুশীলন দরকার তা বোঝা কঠিন হয়।",
  },
  features: [
    {
      icon: "clipboard",
      title: { en: "Practice tests", bn: "অনুশীলন টেস্ট" },
      description: {
        en: "Reading, listening, writing and speaking practice in the real test format.",
        bn: "আসল পরীক্ষার ফরম্যাটে রিডিং, লিসেনিং, রাইটিং ও স্পিকিং অনুশীলন।",
      },
    },
    {
      icon: "chart",
      title: { en: "Progress tracking", bn: "অগ্রগতি ট্র্যাকিং" },
      description: {
        en: "Scores and progress for each student, by module.",
        bn: "প্রতিটি মডিউলে প্রত্যেক শিক্ষার্থীর স্কোর ও অগ্রগতি।",
      },
    },
    {
      icon: "users",
      title: { en: "Teacher tools", bn: "শিক্ষকের টুল" },
      description: {
        en: "Create tests, review answers and give feedback in one place.",
        bn: "এক জায়গায় টেস্ট তৈরি, উত্তর যাচাই ও মতামত দেওয়া।",
      },
    },
  ],
  audience: [
    { en: "IELTS coaching centres", bn: "IELTS কোচিং সেন্টার" },
    {
      en: "Students preparing for IELTS on their own",
      bn: "যে শিক্ষার্থীরা নিজে IELTS প্রস্তুতি নিচ্ছেন",
    },
  ],
};

export const laundryPos: Product = {
  slug: "laundry-pos",
  name: "Laundry POS System",
  status: "in-development",
  icon: "washing-machine",
  category: { en: "Point of sale for laundries", bn: "লন্ড্রির জন্য POS" },
  summary: {
    en: "Takes laundry orders at the counter, prints receipts and tags, tracks each order until delivery and records payments.",
    bn: "কাউন্টারে লন্ড্রি অর্ডার নেয়, রসিদ ও ট্যাগ প্রিন্ট করে, ডেলিভারি পর্যন্ত প্রতিটি অর্ডার ট্র্যাক করে এবং পেমেন্টের হিসাব রাখে।",
  },
  problem: {
    en: "Handwritten slips get lost, clothes get mixed up, and it's hard to tell which orders are ready, which are late and who still has to pay.",
    bn: "হাতে লেখা স্লিপ হারিয়ে যায়, কাপড় মিশে যায়, আর কোন অর্ডার তৈরি, কোনটা দেরি হচ্ছে, কে এখনো টাকা দেননি তা বোঝা কঠিন হয়।",
  },
  features: [
    {
      icon: "printer",
      title: { en: "Orders, receipts and tags", bn: "অর্ডার, রসিদ ও ট্যাগ" },
      description: {
        en: "Take an order in a few taps and print a receipt and item tags.",
        bn: "কয়েক ট্যাপে অর্ডার নিন এবং রসিদ ও কাপড়ের ট্যাগ প্রিন্ট করুন।",
      },
    },
    {
      icon: "clipboard",
      title: { en: "Order status", bn: "অর্ডারের অবস্থা" },
      description: {
        en: "Follow each order from received to washed, ready and delivered.",
        bn: "গ্রহণ থেকে ধোয়া, তৈরি ও ডেলিভারি পর্যন্ত প্রতিটি অর্ডার দেখুন।",
      },
    },
    {
      icon: "wallet",
      title: { en: "Payments and dues", bn: "পেমেন্ট ও বকেয়া" },
      description: {
        en: "Record payments and see which customers still owe money.",
        bn: "পেমেন্ট লিখে রাখুন এবং কোন কাস্টমারের টাকা বাকি তা দেখুন।",
      },
    },
  ],
  audience: [
    { en: "Laundry and dry-cleaning shops", bn: "লন্ড্রি ও ড্রাই-ক্লিনিং দোকান" },
    {
      en: "Businesses with more than one collection point",
      bn: "যাঁদের একাধিক কালেকশন পয়েন্ট আছে",
    },
  ],
};

export const onushilon360: Product = {
  slug: "onushilon360",
  name: "Onushilon360",
  status: "in-development",
  icon: "school",
  category: { en: "University admission preparation", bn: "বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি" },
  summary: {
    en: "A university admission website where students find admission information and prepare with practice questions and model tests.",
    bn: "বিশ্ববিদ্যালয় ভর্তির ওয়েবসাইট, যেখানে শিক্ষার্থীরা ভর্তির তথ্য পায় এবং অনুশীলনী প্রশ্ন ও মডেল টেস্টে প্রস্তুতি নেয়।",
  },
  problem: {
    en: "Admission information is scattered across many websites and notices, and students struggle to find reliable practice material in one place.",
    bn: "ভর্তির তথ্য অনেক ওয়েবসাইট ও নোটিশে ছড়িয়ে থাকে, আর নির্ভরযোগ্য অনুশীলনের উপকরণ এক জায়গায় পাওয়া কঠিন।",
  },
  features: [
    {
      icon: "file-text",
      title: { en: "Admission information", bn: "ভর্তির তথ্য" },
      description: {
        en: "Dates, requirements and notices for each university in one place.",
        bn: "প্রতিটি বিশ্ববিদ্যালয়ের তারিখ, যোগ্যতা ও নোটিশ এক জায়গায়।",
      },
    },
    {
      icon: "clipboard",
      title: { en: "Practice questions and model tests", bn: "অনুশীলনী প্রশ্ন ও মডেল টেস্ট" },
      description: {
        en: "Practise by subject and take timed model tests.",
        bn: "বিষয়ভিত্তিক অনুশীলন করুন এবং সময় ধরে মডেল টেস্ট দিন।",
      },
    },
    {
      icon: "chart",
      title: { en: "Results and progress", bn: "ফলাফল ও অগ্রগতি" },
      description: {
        en: "See scores over time and the topics that need more work.",
        bn: "সময়ের সাথে স্কোর এবং কোন বিষয়ে আরও অনুশীলন দরকার তা দেখুন।",
      },
    },
  ],
  audience: [
    {
      en: "HSC students preparing for university admission",
      bn: "বিশ্ববিদ্যালয় ভর্তির প্রস্তুতি নেওয়া এইচএসসি শিক্ষার্থী",
    },
    { en: "Admission coaching centres", bn: "ভর্তি কোচিং সেন্টার" },
  ],
};

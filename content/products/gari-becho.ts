import type { Product } from "@/lib/types";

/**
 * Gari Becho — facts taken from the product brief, garibecho.com and the
 * official demo video. Screenshots are frames from that video.
 */
export const gariBecho: Product = {
  slug: "gari-becho",
  name: "Gari Becho",
  status: "live",
  icon: "car",
  url: "https://garibecho.com",
  category: { en: "Vehicle shop management", bn: "গাড়ির শোরুম ব্যবস্থাপনা" },
  summary: {
    en: "Keeps a vehicle shop's stock, purchases, sales, installments, dues and investors in one place, so the owner always knows what they own, what they sold and what they are owed.",
    bn: "গাড়ির শোরুমের স্টক, ক্রয়, বিক্রয়, কিস্তি, বকেয়া ও ইনভেস্টরের হিসাব এক জায়গায় রাখে, যাতে মালিক সবসময় জানেন কী আছে, কী বিক্রি হলো আর কার কাছে কত পাওনা।",
  },
  problem: {
    en: "Many vehicle shops still keep their records in notebooks and on paper slips: who bought which bike, how many installments are left, which investor funded it. Payments get missed, profit is hard to work out, and only the owner knows the full picture. Gari Becho puts every record in one place, from the day a vehicle is bought to the day the last installment comes in.",
    bn: "অনেক গাড়ির শোরুম এখনো খাতা আর কাগজের চিরকুটে হিসাব রাখে: কে কোন বাইক কিনল, কত কিস্তি বাকি, কোন ইনভেস্টর টাকা দিল। ফলে পেমেন্ট মিস হয়, লাভের হিসাব মেলানো কঠিন হয়, আর পুরো চিত্রটা শুধু মালিকই জানেন। Gari Becho গাড়ি কেনার দিন থেকে শেষ কিস্তি আসা পর্যন্ত সব হিসাব এক জায়গায় রাখে।",
  },
  howItWorks: [
    {
      title: { en: "Buy", bn: "ক্রয়" },
      description: {
        en: "Record the purchase from a supplier or a customer. The vehicle joins your stock with its chassis and engine number.",
        bn: "সাপ্লায়ার বা কাস্টমারের কাছ থেকে কেনা লিখে রাখুন। চেসিস ও ইঞ্জিন নম্বরসহ গাড়িটি স্টকে যোগ হয়।",
      },
    },
    {
      title: { en: "Sell", bn: "বিক্রয়" },
      description: {
        en: "Choose the vehicle and the buyer, then take cash or set up installments. Print the sale memo on the spot.",
        bn: "গাড়ি ও ক্রেতা বেছে নিন, তারপর নগদ নিন বা কিস্তি ঠিক করুন। সাথে সাথে বিক্রয় মেমো প্রিন্ট করুন।",
      },
    },
    {
      title: { en: "Collect", bn: "আদায়" },
      description: {
        en: "Take payments as they fall due. The balance updates by itself, and the due alert shows who to call today.",
        bn: "সময়মতো কিস্তি আদায় করুন। বাকি টাকার হিসাব নিজে থেকেই আপডেট হয়, আর ডিউ অ্যালার্ট দেখায় আজ কাকে ফোন করতে হবে।",
      },
    },
    {
      title: { en: "Settle", bn: "নিষ্পত্তি" },
      description: {
        en: "Pay your investors their principal and profit share, and see the figures in your daily reports.",
        bn: "ইনভেস্টরদের মূলধন ও লাভের অংশ পরিশোধ করুন এবং দৈনিক রিপোর্টে সব হিসাব দেখুন।",
      },
    },
  ],
  features: [
    {
      icon: "package",
      title: { en: "Stock and purchases", bn: "স্টক ও ক্রয়" },
      description: {
        en: "Record each purchase and see every vehicle in stock with its chassis and engine number.",
        bn: "প্রতিটি ক্রয় লিখে রাখুন এবং চেসিস ও ইঞ্জিন নম্বরসহ স্টকের প্রতিটি গাড়ি দেখুন।",
      },
    },
    {
      icon: "receipt",
      title: { en: "Cash and installment sales", bn: "নগদ ও কিস্তিতে বিক্রয়" },
      description: {
        en: "Sell for cash or on installments and print the sale memo on the spot.",
        bn: "নগদে বা কিস্তিতে বিক্রি করুন এবং সাথে সাথে বিক্রয় মেমো প্রিন্ট করুন।",
      },
    },
    {
      icon: "calendar-clock",
      title: { en: "Bookings with advance", bn: "অগ্রিমসহ বুকিং" },
      description: {
        en: "Hold a vehicle for a buyer with an advance payment and keep track of the deadline.",
        bn: "অগ্রিম নিয়ে ক্রেতার জন্য গাড়ি বুক রাখুন এবং সময়সীমার খেয়াল রাখুন।",
      },
    },
    {
      icon: "wallet",
      title: { en: "Installments and dues", bn: "কিস্তি ও বকেয়া" },
      description: {
        en: "Follow every installment and promise to pay, and see who to call today.",
        bn: "প্রতিটি কিস্তি ও পরিশোধের প্রতিশ্রুতি দেখুন, আজ কাকে ফোন করতে হবে তা জানুন।",
      },
    },
    {
      icon: "hand-coins",
      title: { en: "Investor funding and profit", bn: "ইনভেস্টরের অর্থায়ন ও লাভ" },
      description: {
        en: "Record who funded each vehicle and settle their profit share when it sells.",
        bn: "কোন গাড়িতে কে টাকা দিয়েছেন তা লিখে রাখুন এবং বিক্রির পর তাঁর লাভ বুঝিয়ে দিন।",
      },
    },
    {
      icon: "file-check",
      title: { en: "Registration documents", bn: "রেজিস্ট্রেশন কাগজপত্র" },
      description: {
        en: "Track each vehicle's registration, from bank chalan to document handover.",
        bn: "ব্যাংক চালান থেকে কাগজ হস্তান্তর পর্যন্ত প্রতিটি গাড়ির রেজিস্ট্রেশন ট্র্যাক করুন।",
      },
    },
    {
      icon: "file-text",
      title: { en: "Daily PDF reports", bn: "দৈনিক PDF রিপোর্ট" },
      description: {
        en: "Daily profit, sales and dues reports, ready to download as PDF.",
        bn: "দৈনিক লাভ, বিক্রয় ও বকেয়ার রিপোর্ট, PDF হিসেবে ডাউনলোড করা যায়।",
      },
    },
    {
      icon: "users",
      title: { en: "Staff accounts with roles", bn: "রোলভিত্তিক স্টাফ অ্যাকাউন্ট" },
      description: {
        en: "Give each staff member their own login and decide what they can see and do.",
        bn: "প্রত্যেক স্টাফকে আলাদা লগইন দিন এবং কে কী দেখতে ও করতে পারবে তা ঠিক করুন।",
      },
    },
  ],
  screenshot: {
    src: {
      en: "/images/products/gari-becho/dashboard-en.webp",
      bn: "/images/products/gari-becho/dashboard-bn.webp",
    },
    width: 1440,
    height: 660,
    alt: {
      en: "Gari Becho dashboard showing total purchases, sales and dues, vehicles in stock by type, and items that need attention such as overdue installments.",
      bn: "Gari Becho ড্যাশবোর্ড: মোট ক্রয়, বিক্রয় ও বকেয়া, ধরন অনুযায়ী স্টকের গাড়ি এবং মেয়াদোত্তীর্ণ কিস্তির মতো জরুরি বিষয়।",
    },
  },
  gallery: [
    {
      src: "/images/products/gari-becho/buy-vehicle.webp",
      width: 1440,
      height: 810,
      uiLang: "en",
      caption: { en: "Recording a purchase", bn: "ক্রয় লিখে রাখা" },
      alt: {
        en: "Buy vehicle form with vehicle type, chassis and engine number, brand, model, year, colour and supplier details.",
        bn: "গাড়ি কেনার ফর্ম: গাড়ির ধরন, চেসিস ও ইঞ্জিন নম্বর, ব্র্যান্ড, মডেল, সাল, রং ও সাপ্লায়ারের তথ্য।",
      },
    },
    {
      src: "/images/products/gari-becho/investor-sale.webp",
      width: 1440,
      height: 810,
      uiLang: "en",
      caption: { en: "Selling with investor funding", bn: "ইনভেস্টরের অর্থায়নে বিক্রয়" },
      alt: {
        en: "New investor sale form in three steps: customer, vehicle from stock, and sale details with price, down payment and payment method.",
        bn: "নতুন ইনভেস্টর বিক্রয় ফর্ম, তিন ধাপে: কাস্টমার, স্টক থেকে গাড়ি, এবং দাম, ডাউন পেমেন্ট ও পেমেন্ট পদ্ধতিসহ বিক্রয়ের তথ্য।",
      },
    },
    {
      src: "/images/products/gari-becho/due-alert.webp",
      width: 1440,
      height: 810,
      uiLang: "en",
      caption: { en: "Due alert: who to call today", bn: "ডিউ অ্যালার্ট: আজ কাকে ফোন করবেন" },
      alt: {
        en: "Due alert list of customers with phone numbers, vehicle, installment number, due date, days overdue and amount due.",
        bn: "ডিউ অ্যালার্ট তালিকা: কাস্টমারের ফোন নম্বর, গাড়ি, কিস্তি নম্বর, নির্ধারিত তারিখ, কত দিন পার হয়েছে ও বকেয়া টাকা।",
      },
    },
    {
      src: "/images/products/gari-becho/investors.webp",
      width: 1440,
      height: 810,
      uiLang: "en",
      caption: { en: "Investors and what they are owed", bn: "ইনভেস্টর ও তাঁদের পাওনা" },
      alt: {
        en: "Investors list with phone, opening balance, amount due and actions to invest, pay, calculate profit and view details.",
        bn: "ইনভেস্টরদের তালিকা: ফোন, শুরুর ব্যালান্স, পাওনা টাকা, এবং বিনিয়োগ, পরিশোধ, লাভ হিসাব ও বিস্তারিত দেখার অপশন।",
      },
    },
    {
      src: "/images/products/gari-becho/mobile-dashboard-bn.webp",
      width: 480,
      height: 832,
      uiLang: "bn",
      caption: { en: "On a phone, in Bangla", bn: "ফোনে, বাংলায়" },
      alt: {
        en: "Gari Becho dashboard in Bangla on a mobile phone, showing totals, stock by vehicle type and items that need attention.",
        bn: "মোবাইল ফোনে বাংলায় Gari Becho ড্যাশবোর্ড: মোট হিসাব, ধরন অনুযায়ী স্টক এবং জরুরি বিষয়।",
      },
    },
  ],
  video: {
    src: "https://garibecho.com/videos/gari-becho-demo.mp4",
    durationSeconds: 45,
    description: {
      en: "A 45-second walkthrough, from buying a vehicle to settling with investors.",
      bn: "৪৫ সেকেন্ডের পরিচিতি, গাড়ি কেনা থেকে ইনভেস্টরের হিসাব মেটানো পর্যন্ত।",
    },
  },
  audience: [
    {
      en: "Shops that sell motorcycles, cars, CNGs and auto-rickshaws",
      bn: "মোটরসাইকেল, গাড়ি, সিএনজি ও অটো রিকশা বিক্রির দোকান",
    },
    {
      en: "Dealers who buy second-hand vehicles from customers",
      bn: "যাঁরা কাস্টমারের কাছ থেকে পুরোনো গাড়ি কেনেন",
    },
    {
      en: "Shops that sell on installments and need to follow up dues",
      bn: "যাঁরা কিস্তিতে বিক্রি করেন এবং বকেয়া আদায়ের খোঁজ রাখতে হয়",
    },
    {
      en: "Shops where investors fund vehicles and share the profit",
      bn: "যেসব দোকানে ইনভেস্টর গাড়িতে টাকা দেন এবং লাভ ভাগ করেন",
    },
    {
      en: "Owners who want staff to record sales with limited access",
      bn: "যে মালিকেরা চান স্টাফ সীমিত অ্যাক্সেসে বিক্রয় লিখুক",
    },
  ],
  // [TODO: confirm Gari Becho's technology stack before listing it]
  technologies: [],
  results: [],
  faq: [
    {
      question: { en: "Does Gari Becho work in Bangla?", bn: "Gari Becho কি বাংলায় চলে?" },
      answer: {
        en: "Yes. Every screen is available in English and Bangla, and you can switch at any time from the menu.",
        bn: "হ্যাঁ। প্রতিটি স্ক্রিন ইংরেজি ও বাংলায় আছে, মেনু থেকে যেকোনো সময় ভাষা বদলাতে পারবেন।",
      },
    },
    {
      question: { en: "Can I use it on my phone?", bn: "ফোনে কি ব্যবহার করা যায়?" },
      answer: {
        en: "Yes. Gari Becho runs in the web browser on phones and computers, so you can check stock and dues from anywhere.",
        bn: "হ্যাঁ। Gari Becho ফোন ও কম্পিউটারের ওয়েব ব্রাউজারে চলে, তাই যেকোনো জায়গা থেকে স্টক ও বকেয়া দেখতে পারবেন।",
      },
    },
    {
      question: { en: "Who can see my shop's records?", bn: "আমার দোকানের হিসাব কে দেখতে পারবে?" },
      answer: {
        en: "Only people you give an account to. Your records stay private to your shop, and each staff member gets their own login with the access you choose.",
        bn: "শুধু যাঁদের আপনি অ্যাকাউন্ট দেবেন। আপনার হিসাব শুধু আপনার দোকানের জন্য, আর প্রত্যেক স্টাফ আপনার ঠিক করা অ্যাক্সেসসহ আলাদা লগইন পান।",
      },
    },
    {
      question: {
        en: "Can I record second-hand vehicles bought from customers?",
        bn: "কাস্টমারের কাছ থেকে কেনা পুরোনো গাড়ি কি লেখা যায়?",
      },
      answer: {
        en: "Yes. When you record a purchase you can choose whether it came from a supplier or from a customer.",
        bn: "হ্যাঁ। ক্রয় লেখার সময় সাপ্লায়ার নাকি কাস্টমারের কাছ থেকে কেনা, তা বেছে নিতে পারবেন।",
      },
    },
    {
      question: { en: "How do I get started?", bn: "কীভাবে শুরু করব?" },
      answer: {
        en: "Create your account on garibecho.com, confirm your email and start adding your vehicles. If you'd like a walkthrough first, request a demo below.",
        bn: "garibecho.com-এ অ্যাকাউন্ট খুলুন, ইমেইল নিশ্চিত করুন এবং গাড়ি যোগ করা শুরু করুন। আগে একবার দেখে নিতে চাইলে নিচে ডেমোর অনুরোধ করুন।",
      },
    },
  ],
};

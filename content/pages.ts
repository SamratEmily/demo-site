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

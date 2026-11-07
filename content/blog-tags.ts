import type { Localized } from "@/lib/types";

/**
 * Blog tags. The key is the English URL slug (/blog/tags/<key>/); posts list
 * these keys in their `tags` frontmatter. Add a tag here before using it.
 */
export const blogTags: Record<string, Localized> = {
  "software-planning": { en: "Software planning", bn: "সফটওয়্যার পরিকল্পনা" },
  "small-business": { en: "Small business", bn: "ছোট ব্যবসা" },
  "custom-software": { en: "Custom software", bn: "কাস্টম সফটওয়্যার" },
};

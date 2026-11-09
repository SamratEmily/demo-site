import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/** Reads content/<folder>/<slug>.mdx files at build time. */
export interface MdxFile {
  file: string;
  data: Record<string, unknown>;
  body: string;
}

const fileName = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.mdx$/;

export function readMdx(folder: string): Map<string, MdxFile> {
  const directory = path.join(process.cwd(), "content", folder);
  const found = new Map<string, MdxFile>();
  if (!fs.existsSync(directory)) return found;

  for (const name of fs.readdirSync(directory).sort()) {
    if (!name.endsWith(".mdx")) continue;
    const match = fileName.exec(name);
    if (!match) {
      throw new Error(
        `content/${folder}/${name}: file names must be lowercase English letters, numbers and dashes.`,
      );
    }
    const { data, content } = matter(fs.readFileSync(path.join(directory, name), "utf8"));
    found.set(match[1], { file: `${folder}/${name}`, data, body: content });
  }
  return found;
}

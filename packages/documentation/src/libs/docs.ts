import { join } from "path";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";

const root = join(process.cwd(), "docs");

export function getCategories() {
    return readdirSync(root);
}

export function getDocsList(category: string) {
    return readdirSync(join(root, category));
}

export function getDoc(slug: string, category?: string) {
    const docPath = join(root, category, `${slug}.md`);
    const raw = readFileSync(docPath, "utf8");
    const { data: meta, content } = matter(raw);

    return { slug, meta, content };
}

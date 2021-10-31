import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import remarkSlug from "remark-slug";
import rehypePrism from "@mapbox/rehype-prism";
import rehypeToc from "@jsdevtools/rehype-toc";

export default async function markdown(content: string): Promise<string> {
    const result = await unified()
        .use(remarkParse)
        .use(remarkSlug)
        .use(remarkRehype)
        .use(rehypeToc, {
            headings: ["h2", "h3"],
        })
        .use(rehypePrism)
        .use(rehypeStringify)
        .process(content);

    return result.toString();
}

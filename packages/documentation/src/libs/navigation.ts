import { titleCase } from "./casing";
import { getCategories, getDoc, getDocsList } from "./docs";

type DocumentationLinkItem = {
    name: string;
    slug: string;
    path: string;
};

export type DocumentationLink = DocumentationLinkItem & {
    children?: DocumentationLinkItem[];
};

export function documentation(): DocumentationLink[] {
    return getCategories().map((parent) => ({
        name: titleCase(parent),
        slug: parent,
        path: `/docs/${parent}`,
        children: getDocsList(parent)
            .map((child) => {
                const slug = child.replace(/\.md$/, "");
                const { meta } = getDoc(slug, parent);
                return {
                    name: meta.title,
                    slug: child,
                    order: meta.order,
                    path: `/docs/${parent}/${slug}`,
                };
            })
            .sort((a, b) => (a.order < b.order ? -1 : 1)),
    }));
}

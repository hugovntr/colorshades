import { titleCase } from "./casing";
import { getCategories, getDocsList } from "./docs";

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
        children: getDocsList(parent).map((child) => ({
            name: titleCase(child.replace(/\.md$/, "")),
            slug: child,
            path: `/docs/${parent}/${child.replace(/\.md$/, "")}`,
        })),
    }));
}

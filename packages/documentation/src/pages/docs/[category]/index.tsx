import Docs from "@/layouts/docs";
import Link from "next/link";
import { getCategories, getDocsList } from "@/libs/docs";
import { GetStaticPaths, GetStaticProps } from "next";
import { titleCase } from "@/libs/casing";
import { documentation, DocumentationLink } from "@/libs/navigation";

export default function Index({
    docs,
    category,
    navigation,
}: {
    docs: string[];
    category: string;
    navigation: DocumentationLink[];
}): JSX.Element {
    return (
        <Docs title={titleCase(category)} navigation={navigation}>
            <ul>
                <li className="font-semibold">
                    List of documents in this category
                </li>
                {docs.map((d, i) => (
                    <li key={i}>
                        <Link
                            href={`/docs/${category}/${d.replace(/\.md$/, "")}`}
                        >
                            {d}
                        </Link>
                    </li>
                ))}
            </ul>
        </Docs>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const categories = getCategories();
    return {
        paths: categories.map((category) => ({
            params: {
                category,
            },
        })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const docs = getDocsList(params.category as string);
    const navigation = documentation();
    return {
        props: {
            docs,
            category: params.category,
            navigation,
        },
    };
};

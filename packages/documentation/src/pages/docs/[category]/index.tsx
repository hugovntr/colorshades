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
    docs: DocumentationLink[];
    category: string;
    navigation: DocumentationLink[];
}): JSX.Element {
    return (
        <Docs title={titleCase(category)} navigation={navigation}>
            <h1>{titleCase(category)}</h1>
            <section className="prose py-8">
                <ul>
                    {docs.map((doc) => (
                        <li key={doc.slug}>
                            <Link href={doc.path}>{doc.name}</Link>
                        </li>
                    ))}
                </ul>
            </section>
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
    const docs: DocumentationLink[] = getDocsList(
        params.category as string
    ).map((doc) => ({
        name: titleCase(doc.replace(/\.md$/, "")),
        slug: doc,
        path: `/docs/${params.category}/${doc.replace(/\.md$/, "")}`,
    }));
    const navigation = documentation();
    return {
        props: {
            docs,
            category: params.category,
            navigation,
        },
    };
};

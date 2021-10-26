import Docs from "@/layouts/docs";
import { titleCase } from "@/libs/casing";
import { getCategories, getDoc, getDocsList } from "@/libs/docs";
import markdown from "@/libs/markdown";
import { documentation } from "@/libs/navigation";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Post({
    category,
    slug,
    meta,
    content,
    navigation,
}): JSX.Element {
    return (
        <Docs
            title={`${meta.title} - ${titleCase(category)}`}
            navigation={navigation}
        >
            <article dangerouslySetInnerHTML={{ __html: content }}></article>
        </Docs>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const categories = getCategories();
    return {
        paths: categories.reduce((all, current) => {
            const docs = getDocsList(current);
            return [
                ...all,
                ...docs.map((doc) => ({
                    params: {
                        category: current,
                        slug: doc.replace(/\.md$/, ""),
                    },
                })),
            ];
        }, []),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const navigation = documentation();
    const doc = getDoc(params.slug as string, params.category as string);
    const content = await markdown(doc.content);
    return {
        props: {
            ...doc,
            content,
            category: params.category,
            navigation,
        },
    };
};

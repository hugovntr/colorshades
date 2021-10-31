import Docs from "@/layouts/docs";
import { documentation } from "@/libs/navigation";
import { GetStaticProps } from "next";

export default function Index({ navigation }): JSX.Element {
    return (
        <Docs navigation={navigation}>
            <h1>Documentation</h1>
        </Docs>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const navigation = documentation();
    return {
        props: {
            navigation,
        },
    };
};

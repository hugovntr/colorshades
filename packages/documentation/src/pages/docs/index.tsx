import Docs from "@/layouts/docs";
import { documentation } from "@/libs/navigation";
import { GetStaticProps } from "next";

export default function Index({ navigation }): JSX.Element {
    return (
        <Docs navigation={navigation}>
            <p>Hello world</p>
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

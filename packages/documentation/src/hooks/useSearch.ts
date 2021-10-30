import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";

export default function useSearch(
    searchable: any[]
): [any[], Dispatch<SetStateAction<string>>] {
    const [query, setQuery] = useState<string>(null);
    const [items, setItems] = useState<any[]>(searchable);

    const search = useCallback(
        (types?: string[]) => {
            if (types) {
                setItems((state) =>
                    searchable.filter(
                        (s) =>
                            s.name.toLowerCase().includes(query.substr(1)) &&
                            types.includes(s.type)
                    )
                );
            } else {
                setItems((state) =>
                    searchable.filter((s) =>
                        s.name.toLowerCase().includes(query)
                    )
                );
            }
        },
        [query]
    );

    useEffect(() => {
        if (!query) {
            setItems((state) => searchable);
            return;
        }

        search(query.startsWith(">") ? ["command"] : null);
    }, [query]);

    return [items, setQuery];
}

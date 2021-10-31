import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";

export default function useSearch<T extends Searchable>(
    searchable: T[]
): [T[], Dispatch<SetStateAction<SearchQuery>>] {
    const [query, setQuery] = useState<SearchQuery>(null);
    const [items, setItems] = useState<T[]>(searchable);

    const search = useCallback(() => {
        if (query.type) {
            setItems((state) =>
                searchable.filter(
                    ({ name, type }) =>
                        name.toLowerCase().includes(query.value) &&
                        type === query.type
                )
            );
        } else {
            setItems((state) =>
                searchable.filter(({ name }) =>
                    name.toLowerCase().includes(query.value)
                )
            );
        }
    }, [query]);

    useEffect(() => {
        if (!query) {
            setItems((state) => searchable);
            return;
        }
        search();
    }, [query]);

    return [items, setQuery];
}

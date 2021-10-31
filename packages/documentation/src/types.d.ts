type Scheme = "system" | "dark" | "light";

type Searchable = {
    name: string;
    type: SpotlightItemType;
    category?: string;
};

type HasAction = {
    action: {
        type: "visit" | "scheme";
        value: string;
    };
};

type SpotlightItemType = "document" | "command";

type SpotlightItem = Searchable & HasAction;

type SearchQuery = {
    type?: SpotlightItemType;
    value: string;
};

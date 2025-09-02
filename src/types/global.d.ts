

declare type JournalType = {
    imgUrl: string;
    rating: number;
    categories: string[];
    date: string;
    description: string;
}

declare type JournalListType = {
    listItem:JournalListType[]
}
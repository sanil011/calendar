
/**
 * Represents information about a journal.
 * @typedef {object} JournalType
 * @property {string} id - id of journal.
 * @property {string} imgUrl - The image URL of the journal.
 * @property {rating[]} categories 
 * @property {rating} date - Date of journal when created.
 * @property {rating} description - The description about journal.
 */

declare type JournalType = {
    id: string;
    imgUrl: string;
    rating: number;
    categories: string[];
    date: string;
    description: string;
}

declare type JournalListType = {
    listItem:JournalListType[]
}
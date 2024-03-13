import { Author } from "./author.model";

export interface Book {
    id: number;
    title: string;
    isbn: string;
    price: number;
    publishDate: Date;
    author: Author;
}

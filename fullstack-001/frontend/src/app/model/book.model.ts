import { Author } from "./author.model";
import { Editorial } from "./editorial.model";

export interface Book {
    id: number;
    title: string;
    isbn: string;
    price: number;
    publishDate: Date;
    available: boolean;
    author: Author;
    editorial: Editorial
}

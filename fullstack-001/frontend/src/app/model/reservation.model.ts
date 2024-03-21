import { Book } from "./book.model";
import { User } from "./user.model";

export interface Reservation {
  id: number;
  startDate: Date;
  finishDate:Date;
  price:number;
  book: Book;
  user?: User; // opcional
}

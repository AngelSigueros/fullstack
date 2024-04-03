import { Book } from "./book.model";
import { User } from "./user.model";

export interface Rating {
  id: number;
  score: number;
  comment: string;
  book?: Book;
  user?: User;
}

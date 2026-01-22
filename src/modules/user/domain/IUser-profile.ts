import { Quote } from "../../quote/domain/quote.entity";
import { User } from "./user.entity";

export interface IUserProfile {
    user: User;
    quotes: Quote[];
}
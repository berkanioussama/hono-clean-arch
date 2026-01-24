import { Quote } from "./quote.entity"
import { QuoteId } from "./valueObject"
import { UserId } from "../../user/domain/valueObject"

export interface IQuoteRepo {
    add(quote: Quote): Promise<Quote>
    edit(quote: Quote): Promise<Quote>
    findAll(): Promise<Quote[]>
    findById(id: QuoteId): Promise<Quote | null>
    findByUserId(userId: UserId): Promise<Quote[]>
    remove(id: QuoteId): Promise<void>
}
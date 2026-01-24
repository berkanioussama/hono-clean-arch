import { InferSelectModel } from "drizzle-orm";
import { quotes } from "../../../shared/infrastructure/database/schema";
import { Quote } from "../domain/quote.entity";
import { QuoteId, Author, Description } from "../domain/valueObject";
import { UserId } from "../../user/domain/valueObject";

type DBQuote = InferSelectModel<typeof quotes>

export class QuoteDBMapper {
    static toDomain(dbQuote: DBQuote): Quote {
        const quoteId = QuoteId.fromPersistence(dbQuote.id)
        const userId = UserId.fromPersistence(dbQuote.userId)
        const author = Author.fromPersistence(dbQuote.author)
        const description = Description.fromPersistence(dbQuote.description)
        return Quote.fromPersistence({
            id: quoteId,
            userId: userId,
            author: author,
            description: description,
            createdAt: new Date(dbQuote.createdAt),
            updatedAt: new Date(dbQuote.updatedAt),
        });
    }

    static toDomainList(dbQuotes: DBQuote[]): Quote[] {
        return dbQuotes.map(dbQuote => this.toDomain(dbQuote));
    }
}

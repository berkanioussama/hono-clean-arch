import { InferSelectModel } from "drizzle-orm";
import { quotes } from "../../../shared/infrastructure/database/schema";
import { Quote } from "../domain/quote.entity";
import { Author, Description } from "../domain/valueObject";

type DBQuote = InferSelectModel<typeof quotes>

export class QuoteDBMapper {
    static toDomain(dbQuote: DBQuote): Quote {
        const author = Author.fromPersistence(dbQuote.author)
        const description = Description.fromPersistence(dbQuote.description)
        return Quote.fromPersistence({
            id: dbQuote.id,
            userId: dbQuote.userId,
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

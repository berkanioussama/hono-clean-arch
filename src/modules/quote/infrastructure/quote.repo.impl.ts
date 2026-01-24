import { Quote } from "../domain/quote.entity";
import { QuoteId } from "../domain/valueObject";
import { UserId } from "../../user/domain/valueObject";
import { IQuoteRepo } from "../domain/IQuote.repo";
import { db } from "../../../shared/infrastructure/database/db";
import { quotes } from "../../../shared/infrastructure/database/schema";
import { eq } from "drizzle-orm";
import { QuoteDBMapper } from "./quote.db.mapper";

export class QuoteRepoImpl implements IQuoteRepo {
    
    async add(quote: Quote): Promise<Quote> {
        const insertedQuote = await db.insert(quotes).values({
            id: quote.id.toString(),
            userId: quote.userId.toString(),
            author: quote.author.toString(),
            description: quote.description.toString(),
            createdAt: quote.createdAt,
            updatedAt: quote.updatedAt,
        }).returning();

        return QuoteDBMapper.toDomain(insertedQuote[0]);
    }

    async edit(quote: Quote): Promise<Quote> {
        const updatedQuote = await db.update(quotes).set({
            author: quote.author.toString(),
            description: quote.description.toString(),
            updatedAt: quote.updatedAt,
        }).where(eq(quotes.id, quote.id.toString())).returning();
        
        return QuoteDBMapper.toDomain(updatedQuote[0]);
    }

    async findAll(): Promise<Quote[]> {
        const findedQuotes = await db.select().from(quotes)
        return QuoteDBMapper.toDomainList(findedQuotes)
    }
    
    async findById(id: QuoteId): Promise<Quote | null> {
        const findedQuote = await db.select().from(quotes).where(eq(quotes.id, id.toString())).limit(1);
        if (findedQuote.length === 0) return null

        return QuoteDBMapper.toDomain(findedQuote[0])
    }

    async findByUserId(userId: UserId): Promise<Quote[]> {
        const findedQuotes = await db.select().from(quotes).where(eq(quotes.userId, userId.toString()));
        return QuoteDBMapper.toDomainList(findedQuotes)
    }

    async remove(id: QuoteId): Promise<void> {
        await db.delete(quotes).where(eq(quotes.id, id.toString()));
    }
}
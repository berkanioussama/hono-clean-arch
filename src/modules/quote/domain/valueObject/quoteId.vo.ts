import { ValidationError } from "../../../../shared/domain/errors";

export default class QuoteId {
    private quoteId: string

    private constructor(quoteId: string) {
        this.quoteId = quoteId;
    }

    static generate(): QuoteId {
        return new QuoteId(crypto.randomUUID());
    }

    public static create(quoteId: string): QuoteId {
        const trimmed = quoteId.trim()
        if (!trimmed) throw new ValidationError("Quote ID cannot be empty");
        if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
            throw new ValidationError("Quote ID must contain only letters, numbers, and underscores.");
        }
        if (trimmed.length > 50) {
            throw new ValidationError("Quote ID must be at most 50 characters long.");
        }
        return new QuoteId(trimmed);
    }

    public static fromPersistence(quoteId: string): QuoteId {
        return new QuoteId(quoteId);
    }   

    get value() { return this.quoteId }

    toString() { return this.quoteId }
}
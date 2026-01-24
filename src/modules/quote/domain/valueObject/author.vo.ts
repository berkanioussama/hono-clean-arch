import { ValidationError } from "../../../../shared/domain/errors";

export default class Author {
    private author: string
    private static readonly MIN_LENGTH = 3;
    private static readonly MAX_LENGTH = 100;
    private static readonly AUTHOR_REGEX = /^[a-zA-Z\s'-]+$/;

    private constructor(author: string) {
        this.author = author;
    }

    public static create(author: string): Author {
        const trimmed = author.trim();
        
        if (!trimmed || trimmed.length === 0) {
            throw new ValidationError("Author name is required");
        }
        
        if (trimmed.length < Author.MIN_LENGTH) {
            throw new ValidationError(`Author must be at least ${Author.MIN_LENGTH} characters`);
        }
        
        if (trimmed.length > Author.MAX_LENGTH) {
            throw new ValidationError(`Author cannot exceed ${Author.MAX_LENGTH} characters`);
        }
        
        if (!Author.AUTHOR_REGEX.test(trimmed)) {
            throw new ValidationError("Author can only contain letters, spaces, hyphens, and apostrophes");
        }
        
        return new Author(trimmed);
    }

    public static fromPersistence(value: string): Author {
        return new Author(value.trim());
    }

    get value(): string { return this.author }
    toString(): string { return this.author }
}
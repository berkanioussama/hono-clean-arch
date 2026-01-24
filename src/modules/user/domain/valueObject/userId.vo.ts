import { ValidationError } from "../../../../shared/domain/errors";

export default class UserId {
    private userId: string

    private constructor(userId: string) {
        this.userId = userId;
    }

    static generate(): UserId {
        return new UserId(crypto.randomUUID());
    }

    public static create(userId: string): UserId {
        const trimmed = userId.trim()
        if (!trimmed) throw new ValidationError("User ID cannot be empty");
        if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
            throw new ValidationError("User ID must contain only letters, numbers, and underscores.");
        }
        if (trimmed.length > 50) {
            throw new ValidationError("User ID must be at most 50 characters long.");
        }
        return new UserId(trimmed);
    }

    public static fromPersistence(userId: string): UserId {
        return new UserId(userId);
    }   

    get value() { return this.userId }

    toString() { return this.userId }
}
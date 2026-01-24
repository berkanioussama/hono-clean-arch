import { ValidationError } from "../../../../shared/domain/errors";

export default class ProviderId {
    private providerId: string
    
    constructor(providerId: string) {
        this.providerId = providerId
    }
    
    public static create(providerId: string): ProviderId {
        const trimmed = providerId.trim()
        if (!trimmed) throw new Error("Provider ID cannot be empty");
        if (!trimmed.startsWith('user_')) {
            throw new ValidationError("Provider ID must start with 'user_' for Clerk provider.");
        }
        if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
            throw new ValidationError("Clerk user ID must contain only letters, numbers, and underscores.");
        }
        
        return new ProviderId(trimmed);
    }

    public static fromPersistence(providerId: string): ProviderId {
        return new ProviderId(providerId);
    }
    
    get value() { return this.providerId }
    
    toString() { return this.providerId }
}
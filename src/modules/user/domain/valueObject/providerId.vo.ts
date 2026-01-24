import { ValidationError } from "../../../../shared/domain/validation-error";

export default class ProviderId {
    private providerId: string
    
    constructor(providerId: string) {
        this.providerId = providerId.trim()
    }
    
    public static create(providerId: string): ProviderId {
        if (!providerId.startsWith('user_')) {
            throw new ValidationError("Provider ID must start with 'user_' for Clerk provider.");
        }
        if (!/^[a-zA-Z0-9_]+$/.test(providerId)) {
            throw new ValidationError("Clerk user ID must contain only letters, numbers, and underscores.");
        }
        
        return new ProviderId(providerId);
    }

    public static fromPersistence(providerId: string): ProviderId {
        return new ProviderId(providerId.trim());
    }
    
    get value() { return this.providerId }
    
    toString() { return this.providerId }
}
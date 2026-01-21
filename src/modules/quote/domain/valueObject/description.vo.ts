export default class Description {
    private readonly description: string;
    private static readonly MAX_LENGTH = 255;

    constructor(description: string) {
        this.description = description;
    }

    public static create(description: string): Description {
        const trimmed = description.trim();
        if (trimmed.length > Description.MAX_LENGTH) {
            throw new Error('Description must be less than 255 characters.');
        }
        return new Description(trimmed);
    }

    public static fromPersistence(description: string): Description {
        return new Description(description.trim());
    }
    
    get value(): string { return this.description }
    toString(): string { return this.description }
}
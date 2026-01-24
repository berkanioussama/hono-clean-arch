import { ValidationError } from "../../../../shared/domain/errors";

export default class ImageUrl {
    private imageUrl: string
    private static readonly MAX_LENGTH = 255;
    
    constructor(imageUrl: string) {
        this.imageUrl = imageUrl.trim()
    }
    
    public static create(imageUrl: string): ImageUrl {
        if (!imageUrl || imageUrl.trim().length === 0) {
            throw new ValidationError("Image URL cannot be empty.");
        }
        try { new URL(imageUrl); } catch {
            throw new ValidationError("Invalid URL format.");
        }

        if (!imageUrl.startsWith('http')) {
            throw new ValidationError("Image URL must use HTTP or HTTPS.");
        }

        if (imageUrl.length > ImageUrl.MAX_LENGTH) {
            throw new ValidationError("Image URL must be at most " + this.MAX_LENGTH + " characters long.");
        }
        return new ImageUrl(imageUrl);
    }

    public static fromPersistence(imageUrl: string): ImageUrl {
        return new ImageUrl(imageUrl.trim());
    }
    
    get value() { return this.imageUrl }
    
    toString() { return this.imageUrl }
}
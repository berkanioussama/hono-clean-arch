import { ValidationError } from "../../../../shared/domain/errors";

export default class LastName {
    private lastName: string
    private static readonly MIN_LENGTH = 2;
    private static readonly MAX_LENGTH = 50;
    private static readonly NAME_REGEX = /^[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/;

    private constructor(lastName: string) {
        this.lastName = lastName.trim();
    }

    public static create(lastName: string): LastName {
        const trimmed = lastName.trim();
        if (!trimmed || trimmed.length === 0) {
            throw new ValidationError("Last name is required");
        }
        if (trimmed.length < LastName.MIN_LENGTH) {
            throw new ValidationError(`Last name must be at least ${LastName.MIN_LENGTH} characters`);
        }
        if (trimmed.length > LastName.MAX_LENGTH) {
            throw new ValidationError(`Last name cannot exceed ${LastName.MAX_LENGTH} characters`);
        }
        if (!LastName.NAME_REGEX.test(trimmed)) {
            throw new ValidationError("Last name can only contain letters, spaces, hyphens, and apostrophes");
        }
        return new LastName(trimmed);
    }

    public static fromPersistence(lastName: string): LastName {
        return new LastName(lastName.trim());
    }

    get value(): string { return this.lastName }
    toString(): string { return this.lastName }
}
export default class FirstName {
    private firstName: string
    private static readonly MIN_LENGTH = 2;
    private static readonly MAX_LENGTH = 50;
    private static readonly NAME_REGEX = /^[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/;

    private constructor(firstName: string) {
        this.firstName = firstName;
    }

    public static create(firstName: string): FirstName {
        const trimmed = firstName.trim();
        if (!trimmed || trimmed.length === 0) {
            throw new Error("First name is required");
        }
        if (trimmed.length < FirstName.MIN_LENGTH) {
            throw new Error(`First name must be at least ${FirstName.MIN_LENGTH} characters`);
        }
        if (trimmed.length > FirstName.MAX_LENGTH) {
            throw new Error(`First name cannot exceed ${FirstName.MAX_LENGTH} characters`);
        }
        if (!FirstName.NAME_REGEX.test(trimmed)) {
            throw new Error("First name can only contain letters, spaces, hyphens, and apostrophes");
        }
        return new FirstName(trimmed);
    }

    public static fromPersistence(firstName: string): FirstName {
        return new FirstName(firstName.trim());
    }

    get value(): string { return this.firstName }
    toString(): string { return this.firstName }
}
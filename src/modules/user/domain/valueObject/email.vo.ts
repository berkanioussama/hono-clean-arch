import { ValidationError } from "../../../../shared/domain/validation-error";

export default class Email {
    private emailAddress: string
    private static readonly MAX_LENGTH = 255;
    private static readonly emailRegex = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+(\.[^\s@]+)+$/;

    constructor(emailAddress: string) {
        this.emailAddress = emailAddress;
    }

    public static create(emailAddress: string): Email {
        const trimmed = emailAddress.trim().toLowerCase()
        if (!trimmed || !trimmed.match(Email.emailRegex)) {
            throw new ValidationError("Invalid email address.");
        }
        return new Email(trimmed);
    }

    public static fromPersistence(emailAddress: string): Email {
        return new Email(emailAddress.trim().toLowerCase());
    }

    get value(): string { return this.emailAddress }

    toString(): string { return this.emailAddress }
}
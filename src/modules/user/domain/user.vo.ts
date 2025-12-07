export class Email {
    private emailAddress: string
    private static emailRegex = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+(\.[^\s@]+)+$/;

    constructor(emailAddress: string) {
        this.emailAddress = emailAddress.trim().toLowerCase()
    }

    public static create(emailAddress: string): Email {
        if (!emailAddress || !emailAddress.match(Email.emailRegex)) {
            throw new Error("Invalid email address.");
        }
        return new Email(emailAddress);
    }

    get value() { return this.emailAddress }

    toString() { return this.emailAddress }
}
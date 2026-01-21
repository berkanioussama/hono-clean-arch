import { Author, Description } from "./valueObject";

export interface CreateQuoteProps {
    userId: string;
    author: Author;
    description: Description;
}
export interface QuoteProps extends CreateQuoteProps {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Quote {
    private constructor(private props: QuoteProps) {}

    static create(props: CreateQuoteProps): Quote {
        this.validate(props);
        return new Quote({
            id: crypto.randomUUID(),
            ...props,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static fromPersistence(props: QuoteProps): Quote {
        return new Quote(props);
    }

    private static validate(props: CreateQuoteProps): void {
        if(!(props.author instanceof Author)) {
            throw new Error("Author must be an instance of Author");
        }
        if(!(props.description instanceof Description)) {
            throw new Error("Description must be an instance of Description");
        }
    }

    changeAuthor(newAuthor: Author) {
        this.props.author = newAuthor
        this.props.updatedAt = new Date()
    }
    changeDescription(newDescription: Description) {
        this.props.description = newDescription
        this.props.updatedAt = new Date();
    }
    
    get id(): string { return this.props.id; }
    get userId(): string { return this.props.userId; }
    get author(): Author { return this.props.author; }
    get description(): Description { return this.props.description; }
    get createdAt(): Date { return this.props.createdAt; }
    get updatedAt(): Date { return this.props.updatedAt; }
}

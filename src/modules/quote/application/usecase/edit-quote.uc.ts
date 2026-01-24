import { IQuoteRepo } from "../../domain/IQuote.repo";
import { EditQuoteDTO, QuoteDTO } from "../dto/quote.dto";
import { QuoteDTOMapper } from "../dto/quote.dto.mapper";
import { Author, Description } from "../../domain/valueObject";
import { NotFoundError, UnauthorizedError } from "../../../../shared/domain/errors";
import { QuoteId } from "../../domain/valueObject";

export class EditQuoteUC {
    constructor(private quoteRepo: IQuoteRepo) {}

    async execute(input: EditQuoteDTO): Promise<QuoteDTO> {
        const quoteIdVO = QuoteId.create(input.id)
        const quote = await this.quoteRepo.findById(quoteIdVO);
        if (!quote) throw new NotFoundError("Quote not found")
        
        if (quote.userId.toString() !== input.userId) {
        throw new UnauthorizedError("Unauthorized to edit this quote")
        }
        
        if (input.author) {
            const author = Author.create(input.author)
            quote.changeAuthor(author)
        }
        
        if (input.description) {
            const description = Description.create(input.description)
            quote.changeDescription(description)
        }

        const updatedQuote = await this.quoteRepo.edit(quote)

        return QuoteDTOMapper.toDTO(updatedQuote)
    }
}
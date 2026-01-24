import { IQuoteRepo } from "../../domain/IQuote.repo"
import { QuoteDTO } from "../dto/quote.dto"
import { FindQuoteDTO } from "../dto/quote.dto"
import { QuoteDTOMapper } from "../dto/quote.dto.mapper"
import { UnauthorizedError } from "../../../../shared/domain/errors"
import { QuoteId } from "../../domain/valueObject"

export class FindQuoteByIdUC {
    constructor(private quoteRepo: IQuoteRepo) {}

    async execute({id, userId}: FindQuoteDTO): Promise<QuoteDTO | null> {
        const quoteIdVO = QuoteId.create(id)
        const quote = await this.quoteRepo.findById(quoteIdVO);
        if (!quote) return null;

        if (quote.userId.toString() !== userId) {
            throw new UnauthorizedError("Unauthorized to access this quote");
        }

        return QuoteDTOMapper.toDTO(quote);
    }
}
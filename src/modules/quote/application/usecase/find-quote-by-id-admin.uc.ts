import { IQuoteRepo } from "../../domain/IQuote.repo"
import { QuoteDTO } from "../dto/quote.dto"
import { QuoteDTOMapper } from "../dto/quote.dto.mapper"
import { QuoteId } from "../../domain/valueObject"

export class FindQuoteByIdAdminUC {
    constructor(private quoteRepo: IQuoteRepo) {}

    async execute(id: string): Promise<QuoteDTO | null> {
        const quoteIdVO = QuoteId.create(id)
        const quote = await this.quoteRepo.findById(quoteIdVO);
        if (!quote) return null;

        return QuoteDTOMapper.toDTO(quote);
    }
}
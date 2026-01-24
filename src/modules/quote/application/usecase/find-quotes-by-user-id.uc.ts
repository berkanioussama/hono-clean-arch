import { IQuoteRepo } from "../../domain/IQuote.repo"
import { QuoteDTO } from "../dto/quote.dto"
import { FindQuotesByUserIdDTO } from "../dto/quote.dto"
import { QuoteDTOMapper } from "../dto/quote.dto.mapper"
import { UserId } from "../../../user/domain/valueObject"

export class FindQuotesByUserIdUC {
  constructor(private quoteRepo: IQuoteRepo) {}

  async execute({userId}: FindQuotesByUserIdDTO): Promise<QuoteDTO[]> {
    const userIdVO = UserId.create(userId)
    const quotes = await this.quoteRepo.findByUserId(userIdVO);
    
    return QuoteDTOMapper.toDTOList(quotes);
  }
}
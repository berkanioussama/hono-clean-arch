import { IQuoteRepo } from "../../domain/IQuote.repo"
import { QuoteDTO } from "../dto/quote.dto"
import { QuoteDTOMapper } from "../dto/quote.dto.mapper"
import { UserId } from "../../../user/domain/valueObject"

export class FindQuotesByUserIdAdminUC {
  constructor(private quoteRepo: IQuoteRepo) {}

  async execute(userId: string): Promise<QuoteDTO[]> {
    const userIdVO = UserId.create(userId)
    const quotes = await this.quoteRepo.findByUserId(userIdVO);
    
    return QuoteDTOMapper.toDTOList(quotes);
  }
}
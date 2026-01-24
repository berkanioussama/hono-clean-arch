import { Quote } from "../../domain/quote.entity"
import { IQuoteRepo } from "../../domain/IQuote.repo"
import { AddQuoteDTO, QuoteDTO } from "../dto/quote.dto"
import { QuoteDTOMapper } from "../dto/quote.dto.mapper";
import { Author, Description } from "../../domain/valueObject";
import { UserId } from "../../../user/domain/valueObject";

export class AddQuoteUC {
    constructor(private quoteRepo: IQuoteRepo) {}

    async execute(input: AddQuoteDTO): Promise<QuoteDTO> {
      const userIdVO = UserId.create(input.userId)
      const author = Author.create(input.author)
      const description = Description.create(input.description)
      
      const quote = Quote.create({
        userId: userIdVO,
        author: author,
        description: description,
      });

      const createdQuote = await this.quoteRepo.add(quote)

      return QuoteDTOMapper.toDTO(createdQuote)
  }
}
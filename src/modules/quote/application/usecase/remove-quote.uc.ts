import { IQuoteRepo } from "../../domain/IQuote.repo";
import { RemoveQuoteDTO } from "../dto/quote.dto";
import { NotFoundError, UnauthorizedError } from "../../../../shared/domain/errors";
import { QuoteId } from "../../domain/valueObject";

export class RemoveQuoteUC {
  constructor(private quoteRepo: IQuoteRepo) {}

  async execute({id, userId}: RemoveQuoteDTO): Promise<void> {
    const quoteIdVO = QuoteId.create(id)
    const quote = await this.quoteRepo.findById(quoteIdVO);
    if (!quote) throw new NotFoundError("Quote not found");
    if (quote.userId.toString() !== userId) throw new UnauthorizedError("Unauthorized to remove this quote");
    await this.quoteRepo.remove(quoteIdVO);
  }
}
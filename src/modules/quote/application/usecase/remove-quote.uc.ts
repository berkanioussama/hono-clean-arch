import { IQuoteRepo } from "../../domain/IQuote.repo";
import { RemoveQuoteDTO } from "../dto/quote.dto";
import { NotFoundError, UnauthorizedError } from "../../../../shared/domain/errors";

export class RemoveQuoteUC {
  constructor(private quoteRepo: IQuoteRepo) {}

  async execute({id, userId}: RemoveQuoteDTO): Promise<void> {
    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new NotFoundError("Quote not found");
    if (quote.userId !== userId) throw new UnauthorizedError("Unauthorized to remove this quote");
    await this.quoteRepo.remove(id);
  }
}
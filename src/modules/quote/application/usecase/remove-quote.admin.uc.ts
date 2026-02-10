import { IQuoteRepo } from "../../domain/IQuote.repo";
import { NotFoundError } from "../../../../shared/domain/errors";
import { QuoteId } from "../../domain/valueObject";

export class RemoveQuoteAdminUC {
  constructor(private quoteRepo: IQuoteRepo) {}

  async execute(id: string): Promise<void> {
    const quoteIdVO = QuoteId.create(id)
    const quote = await this.quoteRepo.findById(quoteIdVO);
    if (!quote) throw new NotFoundError("Quote not found");
    
    await this.quoteRepo.remove(quoteIdVO);
  }
}
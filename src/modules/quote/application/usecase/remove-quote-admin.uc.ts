import { IQuoteRepo } from "../../domain/IQuote.repo";
import { NotFoundError } from "../../../../shared/domain/errors";

export class RemoveQuoteAdminUC {
  constructor(private quoteRepo: IQuoteRepo) {}

  async execute(id: string): Promise<void> {
    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new NotFoundError("Quote not found");
    
    await this.quoteRepo.remove(id);
  }
}
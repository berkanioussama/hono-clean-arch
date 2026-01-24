import { Quote } from "../../domain/quote.entity";
import { QuoteDTO } from "./quote.dto";

export class QuoteDTOMapper {
  static toDTO(quote: Quote): QuoteDTO {
    return {
      id: quote.id.toString(),
      userId: quote.userId.toString(),
      author: quote.author.toString(),
      description: quote.description.toString(),
      createdAt: quote.createdAt,
      updatedAt: quote.updatedAt,
    };
  }

  static toDTOList(quotes: Quote[]): QuoteDTO[] {
    return quotes.map(quote => this.toDTO(quote));
  }
}
import { Context } from "hono";
import { FindAllQuotesAdminUC } from "../application/usecase/find-all-quotes.admin.uc";
import { FindQuoteByIdAdminUC } from "../application/usecase/find-quote-by-id.admin.uc";
import { FindQuotesByUserIdAdminUC } from "../application/usecase/find-quotes-by-user-id.admin.uc";
import { RemoveQuoteAdminUC } from "../application/usecase/remove-quote.admin.uc";
import { successResponse } from "../../../shared/api/utils/api-response";
import { errorHandler } from "../../../shared/api/utils/error-handler";

export class QuoteAdminController {
    constructor(
        private findAllQuotesAdminUC: FindAllQuotesAdminUC,
        private findQuoteByIdAdminUC: FindQuoteByIdAdminUC,
        private findQuotesByUserIdAdminUC: FindQuotesByUserIdAdminUC,
        private removeQuoteAdminUC: RemoveQuoteAdminUC,
    ) {}
    

    async findAllQuotesAdmin(c: Context) {
        try {
            const quotes = await this.findAllQuotesAdminUC.execute()
            return successResponse(c, 200, quotes)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting quotes"})
        }
    }

    async findQuoteByIdAdmin(c: Context) {
        try {
            const id = c.req.param("id");
            const quote = await this.findQuoteByIdAdminUC.execute( id )
            return successResponse(c, 200, quote)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting quote"})
        }
    }

    async findQuotesByUserIdAdmin(c: Context) {
        try {
            const userId = c.req.param("userId");
            const quotes = await this.findQuotesByUserIdAdminUC.execute(userId)
            return successResponse(c, 200, quotes)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting quotes by user"})
        }
    }

    async removeQuoteAdmin(c: Context) {
        try {
            const id = c.req.param("id");
            await this.removeQuoteAdminUC.execute(id)
            return successResponse(c, 200)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: deleting quote"})
        }
    }
}
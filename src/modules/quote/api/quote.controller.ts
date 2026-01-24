import { Context } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { AddQuoteUC } from "../application/usecase/add-quote.uc";
import { EditQuoteUC } from "../application/usecase/edit-quote.uc";
import { FindQuoteByIdUC } from "../application/usecase/find-quote-by-id.uc";
import { FindQuotesByUserIdUC } from "../application/usecase/find-quotes-by-user-id.uc";
import { RemoveQuoteUC } from "../application/usecase/remove-quote.uc";
import { successResponse } from "../../../shared/api/utils/api-response";
import { errorHandler } from "../../../shared/api/utils/error-handler";
import { AddQuoteSchema, EditQuoteSchema } from "./quote.validator";
import { UserService } from "../../user/application/service/user.service";
import { ValidationError, NotFoundError, UnauthorizedError } from "../../../shared/domain/errors";

export class QuoteController {
    constructor(
        private addQuoteUC: AddQuoteUC,
        private editQuoteUC: EditQuoteUC,
        private findQuoteByIdUC: FindQuoteByIdUC,
        private findQuotesByUserIdUC: FindQuotesByUserIdUC,
        private removeQuoteUC: RemoveQuoteUC,
        private userService: UserService
    ) {}

    async addQuote(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth || !auth.userId) throw new UnauthorizedError ("Unauthorized, not connected")
            const user = await this.userService.findUserByProviderId(auth.userId)
            if(!user) throw new NotFoundError("User not found")
            const body = AddQuoteSchema.safeParse(await c.req.json())
            if(!body.success) throw new ValidationError("Invalid request data")
            const quote = await this.addQuoteUC.execute({userId: user.id, ...body.data})
            return successResponse(c, 201, quote)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: creating quote"})
        }
    }
    
    async editQuote(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth || !auth.userId) throw new UnauthorizedError("Unauthorized, not connected")
            const user = await this.userService.findUserByProviderId(auth.userId)
            if(!user) throw new NotFoundError("User not found")
            const id = c.req.param("id");
            const body = EditQuoteSchema.safeParse(await c.req.json())
            if(!body.success) throw new ValidationError("Invalid request data")
            const quote = await this.editQuoteUC.execute({ id, userId: user.id, ...body.data})
            return successResponse(c, 200, quote)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: updating quote"})
        }
    }

    async findQuoteById(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth?.userId) throw new UnauthorizedError("Unauthorized, not connected")
            const id = c.req.param("id");
            const quote = await this.findQuoteByIdUC.execute({ id, userId: auth.userId })
            return successResponse(c, 200, quote)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting quote"})
        }
    }

    async findQuotesByUserId(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth?.userId) throw new UnauthorizedError("Unauthorized, not connected")
            const user = await this.userService.findUserByProviderId(auth.userId)
            if(!user) throw new NotFoundError("User not found")
            const quotes = await this.findQuotesByUserIdUC.execute({userId: user.id})
            return successResponse(c, 200, quotes)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting quotes by user"})
        }
    }

    async removeQuote(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth || !auth.userId) throw new UnauthorizedError("Unauthorized, not connected")
            const user = await this.userService.findUserByProviderId(auth.userId)
            if(!user) throw new NotFoundError("User not found")
            const id = c.req.param("id");
            await this.removeQuoteUC.execute({ id, userId: user.id })
            return successResponse(c, 200, "Quote deleted")
        } catch (error) {
            return errorHandler({c, error, message: "Server error: deleting quote"})
        }
    }
}
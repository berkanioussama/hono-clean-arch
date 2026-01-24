import { Context } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { EditUserUC } from "../application/usecase/edit-user.uc";
import { FindUserByProviderIdUC } from "../application/usecase/find-user-by-provider-id.uc";
import { successResponse } from "../../../shared/api/utils/api-response";
import { errorHandler } from "../../../shared/api/utils/error-handler";
import { EditUserSchema } from "./user.validator";
import { ValidationError, UnauthorizedError } from "../../../shared/domain/errors";

export class UserController {
    constructor(
        private editUserUC : EditUserUC,
        private findUserByProviderIdUC: FindUserByProviderIdUC,
        private findProfileByProviderIdUC: FindUserByProviderIdUC,
    ) {}

    async editUser(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth) throw new UnauthorizedError("Unauthorized, not connected")
            const body = EditUserSchema.safeParse(await c.req.json())
            if(!body.success) throw new ValidationError("Invalid request data")
            const user = await this.editUserUC.execute(body.data)
            return successResponse(c, 200, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: updating user"})
        }
    }

    async findUserByProviderId(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth?.userId) throw new UnauthorizedError("Unauthorized, not connected")
            const user = await this.findUserByProviderIdUC.execute(auth.userId)
            return successResponse(c, 200, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting user"})
        }
    }

    async findProfileByProviderId(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth?.userId) throw new UnauthorizedError("Unauthorized, not connected")
            const user = await this.findProfileByProviderIdUC.execute(auth.userId)
            return successResponse(c, 200, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting user"})
        }
    }
}
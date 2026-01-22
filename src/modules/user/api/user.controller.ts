import { Context } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { EditUserUC } from "../application/usecase/edit-user.uc";
import { FindUserByProviderIdUC } from "../application/usecase/find-user-by-provider-id.uc";
import { successResponse, errorResponse } from "../../../shared/api/utils/api-response";
import { errorHandler } from "../../../shared/api/utils/error-handler";
import { EditUserSchema } from "./user.validator";


export class UserController {
    constructor(
        private editUserUC : EditUserUC,
        private findUserByProviderIdUC: FindUserByProviderIdUC,
        private findProfileByProviderIdUC: FindUserByProviderIdUC,
    ) {}

    async editUser(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth) return errorResponse(c, 401, "Unauthorized, not connected")
            const body = EditUserSchema.safeParse(await c.req.json())
            if(!body.success) return errorResponse(c, 400, "Invalid request data")
            const user = await this.editUserUC.execute(body.data)
            return successResponse(c, 200, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: updating user"})
        }
    }

    async findUserByProviderId(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth?.userId) return errorResponse(c, 401, "Unauthorized, not connected")
            const user = await this.findUserByProviderIdUC.execute(auth.userId)
            return successResponse(c, 200, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting user"})
        }
    }

    async findProfileByProviderId(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth?.userId) return errorResponse(c, 401, "Unauthorized, not connected")
            const user = await this.findProfileByProviderIdUC.execute(auth.userId)
            return successResponse(c, 200, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting user"})
        }
    }
}
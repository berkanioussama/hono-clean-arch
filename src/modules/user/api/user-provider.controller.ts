import { getAuth } from "@hono/clerk-auth";
import { ApiResponse } from "@/shared/api/utils/api-response";
import { errorHandler } from "@/shared/api/utils/error-handler";
import { Context } from "hono";
import { FindUserByProviderIdUC } from "@/modules/user/application/usecase/find-user-by-provider-id.uc";

export class UserProviderController {
    constructor(
        private findUserByIdUC: FindUserByProviderIdUC,
    ) {}

    async getUserById(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth || !auth.userId) throw new Error("Unauthorized, not connected")
            const id = c.req.param("id")
            if(id !== auth.userId) throw new Error("Unauthorized to access this user")
            const user = await this.findUserByIdUC.execute({ providerId: auth.userId })
            return c.json(ApiResponse(user))
        } catch (error) {
            return errorHandler({c, error, message: "error getting user"})
        }
    }
}
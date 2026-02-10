import { Context } from "hono";
import { AddUserAdminUC } from "../application/usecase/add-user.admin.uc";
import { EditUserAdminUC } from "../application/usecase/edit-user.admin.uc";
import { FindUserByIdAdminUC } from "../application/usecase/find-user-by-id.admin.uc";
import { RemoveUserAdminUC } from "../application/usecase/remove-user.uc";
import { FindAllUsersAdminUC } from "../application/usecase/find-all-users.admin.uc";
import { successResponse } from "../../../shared/api/utils/api-response";
import { errorHandler } from "../../../shared/api/utils/error-handler";
import { AddUserAdminSchema, EditUserAdminSchema } from "./user.validator";
import { FindProfileByIdAdminUC } from "../application/usecase/find-profile-by-id.admin.uc";
import { ValidationError, NotFoundError } from "../../../shared/domain/errors";

export class UserAdminController {
    constructor(
        private addUserAdminUC : AddUserAdminUC,
        private editUserAdminUC : EditUserAdminUC,
        private findAllUsersAdminUC: FindAllUsersAdminUC,
        private findUserByIdAdminUC: FindUserByIdAdminUC,
        private findProfileByIdAdminUC: FindProfileByIdAdminUC,
        private removeUserAdminUC : RemoveUserAdminUC
    ) {}

    async addUserAdmin(c: Context) {
        try {
            const body = AddUserAdminSchema.safeParse(await c.req.json())
            if(!body.success) throw new ValidationError("Invalid request data")
            const user = await this.addUserAdminUC.execute(body.data)
            return successResponse(c, 201, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: creating user"})
        }
    }

    async editUserAdmin(c: Context) {
        try {
            const id = c.req.param("id");
            const body = EditUserAdminSchema.safeParse(await c.req.json())
            if(!body.success) throw new ValidationError("Invalid request data")
            const user = await this.editUserAdminUC.execute({id, ...body.data})
            return successResponse(c, 200, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: updating user"})
        }
    }

    async findAllUsersAdmin(c: Context) {
        try {
            const users = await this.findAllUsersAdminUC.execute()
            return successResponse(c, 200, users)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting users"})
        }
    }

    async findUserByIdAdmin(c: Context) {
        try {
            const id = c.req.param("id");
            const user = await this.findUserByIdAdminUC.execute(id)
            if (!user) throw new NotFoundError("User not found")
            return successResponse(c, 200, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting user"})
        }
    }

    async findProfileByIdAdmin(c: Context) {
        try {
            const id = c.req.param("id");
            const profile = await this.findProfileByIdAdminUC.execute(id)
            if (!profile) throw new NotFoundError("profile not found")
            return successResponse(c, 200, profile)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting user"})
        }
    }

    async removeUserAdmin(c: Context) {
        try {
            const id = c.req.param("id");
            await this.removeUserAdminUC.execute(id)
            return successResponse(c, 200)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: deleting user"})
        }
    }
}
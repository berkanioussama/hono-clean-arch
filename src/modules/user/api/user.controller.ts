import { Context } from "hono";
import { CreateUserUC } from "../application/command/create-user.uc";
import { GetUserByIdUC } from "../application/query/get-user-by-id.uc";
import { UpdateUserUC } from "../application/command/update-user.uc";
import { DeleteUserUC } from "../application/command/delete-user.uc";
import { GetAllUsersUC } from "../application/query/get-all-users.uc";
import { ApiResponse } from "../../../shared/api/utils/api-response";
import { handelError } from "../../../shared/api/utils/handel-error";
import { getAuth } from "@hono/clerk-auth";

export class UserController {
    constructor(
        private createUserUC : CreateUserUC,
        private getAllUsersUC: GetAllUsersUC,
        private getUserByIdUC: GetUserByIdUC,
        private updateUserUC : UpdateUserUC,
        private deleteUserUC : DeleteUserUC
    ) {}

    async createUser(c: Context) {
        try {
            const auth = getAuth(c)
            const data = c.req.valid('json')
            const user = await this.createUserUC.execute({authProviderId: auth.userId, ...data})
            return c.json(ApiResponse(user), 201)
        } catch (error) {
            return handelError({c, error, message: "error creating user"})
        }
    }

    async getAllUsers(c: Context) {
        try {
            const users = await this.getAllUsersUC.execute()
            return c.json(ApiResponse(users))
        } catch (error) {
            return handelError({c, error, message: "error getting users"})
        }
    }

    async getUserById(c: Context) {
        try {
            const auth = getAuth(c)
            const id = c.req.param("id");
            const user = await this.getUserByIdUC.execute({ id, authProviderId: auth.userId })
            return c.json(ApiResponse(user))
        } catch (error) {
            return handelError({c, error, message: "error getting user"})
        }
    }

    async updateUser(c: Context) {
        try {
            const auth = getAuth(c)
            const id = c.req.param("id");
            const body = c.req.valid('json')
            const user = await this.updateUserUC.execute({id, authProviderId: auth.userId, ...body})
            return c.json(ApiResponse(user))
        } catch (error) {
            return handelError({c, error, message: "error updating user"})
        }
    }

    async deleteUser(c: Context) {
        try {
            const id = c.req.param("id");
            await this.deleteUserUC.execute({ id })
            return c.json(ApiResponse("User deleted"))
        } catch (error) {
            return handelError({c, error, message: "error deleting user"})
        }
    }
}
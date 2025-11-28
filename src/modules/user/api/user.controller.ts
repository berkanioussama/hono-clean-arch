import { Context } from "hono";
import { CreateUserUseCase } from "../application/commands/create-user.usecase";
import { GetUserByIdUseCase } from "../application/queries/get-user-by-id.usecase";
import { UpdateUserUseCase } from "../application/commands/update-user.usecase";
import { DeleteUserUseCase } from "../application/commands/delete-user.usecase";
import { GetAllUsersUseCase } from "../application/queries/get-all-users.usecase";
import { ApiResponse } from "../../../shared/api/utils/api-response";

export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private getAllUsersUseCase: GetAllUsersUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase
    ) {}

    async createUser(c: Context) {
        try {
            const auth = c.get("auth");
            const data = c.req.valid('json')
            const user = await this.createUserUseCase.execute({clerkUserId: auth.userId, ...data})
            return c.json(ApiResponse(user), 201)
        } catch (error) {
            return c.json(ApiResponse("error creating user"), 400)
        }
    }

    async getAllUsers(c: Context) {
        try {
            const users = await this.getAllUsersUseCase.execute()
            return c.json(ApiResponse(users))
        } catch (error) {
            return c.json(ApiResponse("error getting users"), 400)
        }
    }

    async getUserById(c: Context) {
        try {
            const auth = c.get("auth");
            const id = c.req.param("id");
            const user = await this.getUserByIdUseCase.execute({ id, clerkUserId: auth.userId })
            return c.json(ApiResponse(user))
        } catch (error) {
            return c.json(ApiResponse("error getting user"), 400)
        }
    }

    async updateUser(c: Context) {
        try {
            const auth = c.get("auth");
            const id = c.req.param("id");
            const body = c.req.valid('json')
            const user = await this.updateUserUseCase.execute({id, clerkUserId: auth.userId, ...body})
            return c.json(ApiResponse(user))
        } catch (error) {
            return c.json(ApiResponse("error updating user"), 400)
        }
    }

    async deleteUser(c: Context) {
        try {
            const id = c.req.param("id");
            await this.deleteUserUseCase.execute({ id })
            return c.json(ApiResponse("User deleted"))
        } catch (error) {
            return c.json(ApiResponse("error deleting user"), 400)
        }
    }
}
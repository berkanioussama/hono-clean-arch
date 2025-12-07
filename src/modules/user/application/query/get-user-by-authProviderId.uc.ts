import { IUserAuthProviderRepo } from "../../domain/IUser-authProvider-repo"
import { GetUserByAuthProviderInputDTO } from "../dto/user-input.dto"

export class GetUserByAuthProviderIdUC {
    constructor(private userAuthProviderRepo: IUserAuthProviderRepo) {}

    async execute(input: GetUserByAuthProviderInputDTO) {
        const user = await this.userAuthProviderRepo.findById(input.authProviderId)
        if (!user) throw new Error('User not found')
        return user
    }
}
import { IUserRepo } from "../../domain/IUser.repo"
import { UserProfileDTO } from "../dto/user.dto"
import { UserProfileDTOMapper } from "../dto/user-profile.dto.mapper"

export class FindProfileByProviderIdUC {
    constructor(private userRepo: IUserRepo) {}

    async execute(providerId: string): Promise<UserProfileDTO> {
        const userProfile = await this.userRepo.findProfileByProviderId(providerId)
        if (!userProfile) throw new Error('User profile not found')

        return UserProfileDTOMapper.toDTO(userProfile)
    }
}
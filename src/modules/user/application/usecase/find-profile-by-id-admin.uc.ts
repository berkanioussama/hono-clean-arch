import { IUserRepo } from "../../domain/IUser.repo"
import { UserProfileDTO } from "../dto/user.dto"
import { UserProfileDTOMapper } from "../dto/user-profile-dto.mapper"

export class FindProfileByIdAdminUC {
    constructor(private userRepo: IUserRepo) {}

    async execute(id: string): Promise<UserProfileDTO> {
        const userProfile = await this.userRepo.findProfileById(id)
        if (!userProfile) throw new Error('User profile not found')

        return UserProfileDTOMapper.toDTO(userProfile)
    }
}
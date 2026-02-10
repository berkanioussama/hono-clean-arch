import { IUserRepo } from "../../domain/IUser.repo"
import { UserProfileDTO } from "../dto/user.dto"
import { UserProfileDTOMapper } from "../dto/user-profile.dto.mapper"
import { NotFoundError } from "../../../../shared/domain/errors"
import { UserId } from "../../domain/valueObject"

export class FindProfileByIdAdminUC {
    constructor(private userRepo: IUserRepo) {}

    async execute(id: string): Promise<UserProfileDTO> {
        const userId = UserId.create(id)
        const userProfile = await this.userRepo.findProfileById(userId)
        if (!userProfile) throw new NotFoundError('User profile not found')

        return UserProfileDTOMapper.toDTO(userProfile)
    }
}
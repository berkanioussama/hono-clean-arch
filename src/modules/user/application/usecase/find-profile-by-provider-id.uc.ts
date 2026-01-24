import { IUserRepo } from "../../domain/IUser.repo"
import { UserProfileDTO } from "../dto/user.dto"
import { UserProfileDTOMapper } from "../dto/user-profile.dto.mapper"
import { NotFoundError } from "../../../../shared/domain/errors"
import { ProviderId } from "../../domain/valueObject"

export class FindProfileByProviderIdUC {
    constructor(private userRepo: IUserRepo) {}

    async execute(providerId: string): Promise<UserProfileDTO> {
        const providerIdVO = ProviderId.create(providerId)
        const userProfile = await this.userRepo.findProfileByProviderId(providerIdVO)
        if (!userProfile) throw new NotFoundError('User profile not found')

        return UserProfileDTOMapper.toDTO(userProfile)
    }
}
import { IUserRepo } from "../../domain/IUser.repo"
import { UserDTO } from "../dto/user.dto"
import { UserDTOMapper } from "../dto/user.dto.mapper"
import { NotFoundError } from "../../../../shared/domain/errors"
import { ProviderId } from "../../domain/valueObject"

export class FindUserByProviderIdAdminUC {
    constructor(private userRepo: IUserRepo) {}

    async execute(providerId: string): Promise<UserDTO> {
        const providerIdVO = ProviderId.create(providerId)
        const user = await this.userRepo.findByProviderId(providerIdVO)
        if (!user) throw new NotFoundError('User not found')

        return UserDTOMapper.toDTO(user)
    }
}
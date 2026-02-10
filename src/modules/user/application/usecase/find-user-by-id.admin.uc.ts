import { IUserRepo } from "../../domain/IUser.repo"
import { UserDTO } from "../dto/user.dto"
import { UserDTOMapper } from "../dto/user.dto.mapper"
import { UserId } from "../../domain/valueObject"

export class FindUserByIdAdminUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(id: string): Promise<UserDTO | null> {
    const userId = UserId.create(id)

    const user = await this.userRepo.findById(userId);
    if (!user) return null;

    return UserDTOMapper.toDTO(user);
  }
}
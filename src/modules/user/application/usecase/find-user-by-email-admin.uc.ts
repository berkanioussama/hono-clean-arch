import { IUserRepo } from "../../domain/IUser.repo"
import { UserDTO } from "../dto/user.dto"
import { UserDTOMapper } from "../dto/user.dto.mapper"
import { Email } from "../../domain/valueObject"

export class FindUserByEmailAdminUC {
  constructor(private userRepo: IUserRepo) {}
  
  async execute(email: string): Promise<UserDTO | null> {
    const emailVO = Email.create(email)

    const user = await this.userRepo.findByEmail(emailVO)
    if (!user) return null;

    return UserDTOMapper.toDTO(user)
  }
}
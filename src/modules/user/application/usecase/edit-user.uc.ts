import { IUserRepo } from "../../domain/IUser.repo";
import { Email, FirstName, LastName, ImageUrl } from "../../domain/valueObject";
import { EditUserDTO, UserDTO } from "../dto/user.dto";
import { UserDTOMapper } from "../dto/user.dto.mapper";
import { NotFoundError, UnauthorizedError } from "../../../../shared/domain/errors";
import { UserId } from "../../domain/valueObject";

export class EditUserUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: EditUserDTO): Promise<UserDTO> {
    const userId = UserId.create(input.id)
    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundError("User not found")

    if(user.providerId.toString() !== input.providerId) throw new UnauthorizedError("Not authorized to edit this user")
    
    if (input.firstName) {
      const firstName = FirstName.create(input.firstName)
      user.changeFirstName(firstName)
    }

    if (input.lastName) {
      const lastName = LastName.create(input.lastName)
      user.changeLastName(lastName)
    }

    if (input.email) {
      const email = Email.create(input.email)
      user.changeEmail(email)
    }
    if (input.image) {
      const image = ImageUrl.create(input.image)
      user.changeImage(image)
    }

    const updatedUser = await this.userRepo.edit(user)

    return UserDTOMapper.toDTO(updatedUser)
  }
}

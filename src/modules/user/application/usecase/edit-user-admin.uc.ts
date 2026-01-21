import { IUserRepo } from "../../domain/IUser.repo";
import { Email, ImageUrl, FirstName, LastName } from "../../domain/valueObject";
import { EditUserAdminDTO, UserDTO } from "../dto/user.dto";
import { UserDTOMapper } from "../dto/user-dto.mapper";

export class EditUserAdminUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: EditUserAdminDTO): Promise<UserDTO> {
    
    const user = await this.userRepo.findById(input.id);
    if (!user) throw new Error("User not found")
    
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
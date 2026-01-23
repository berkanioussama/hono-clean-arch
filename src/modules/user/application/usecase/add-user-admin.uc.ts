import { User } from "../../domain/user.entity"
import { IUserRepo } from "../../domain/IUser.repo"
import { AddUserDTO, UserDTO } from "../dto/user.dto"
import { Email, ProviderId, ImageUrl, FirstName, LastName } from "../../domain/valueObject";
import { UserDTOMapper } from "../dto/user.dto.mapper";

export class AddUserAdminUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: AddUserDTO): Promise<UserDTO> {

    const existingUser = await this.userRepo.findByProviderId(input.providerId)
    if (existingUser) throw new Error('User already exists')

    const existingUserByEmail = await this.userRepo.findByEmail(input.email)
    if (existingUserByEmail) throw new Error('User already exists')

    const providerId = ProviderId.create(input.providerId)
    const email = Email.create(input.email)
    const firstName = FirstName.create(input.firstName)
    const lastName = LastName.create(input.lastName)
    const image = ImageUrl.create(input.image)

    const user = User.create({
      providerId: providerId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      image: image,
    });

    const createdUser = await this.userRepo.add(user)

    return UserDTOMapper.toDTO(createdUser)
  }
}
import { UserRepository } from "../../domain/user.repository";
import { UpdateUserInputDTO, UpdateUserOutputDTO } from "../dto/update-user.dto";
import { UserMapper } from "../mappers/user.mapper";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: UpdateUserInputDTO): Promise<UpdateUserOutputDTO> {
    console.log(input)
    const user = await this.userRepository.findById(input.id);
    if (!user) throw new Error("User not found");
    console.log(user)
    if (input.name) user.changeName(input.name);
    if (input.email) user.changeEmail(input.email);
    console.log(user)

    const updatedUser = await this.userRepository.update(user); 

    return UserMapper.toDTO(updatedUser);
  }
}

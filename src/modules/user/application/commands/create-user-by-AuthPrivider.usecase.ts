import { User } from "../../domain/user.entity";
import { IUserRepository } from "../../domain/IUser.repository";
import { CreateUserInputDTO } from "../dto/user-input.dto";
import { UserMapper } from "../mappers/user.mapper";
import { UserOutputDTO } from "../dto/user-output.dto";

export class CreateUserByAuthProviderIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: CreateUserInputDTO): Promise<UserOutputDTO> {

    const existingUser = await this.userRepository.findByAuthProviderId(input.authProviderId)
    if (existingUser) {
      throw new Error('User already exists')
    }

    const user = new User({
      id: crypto.randomUUID(),
      authProviderId: input.authProviderId,
      name: input.name || '',
      email: input.email || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.userRepository.add(user)
    return UserMapper.toDTO(createdUser)
  }
}
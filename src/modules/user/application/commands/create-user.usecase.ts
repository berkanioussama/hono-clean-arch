import { User } from "../../domain/user.entity"
import { UserRepository } from "../../domain/user.repository"
import { CreateUserInputDTO, CreateUserOutputDTO } from "../dto/create-user.dto"
import { UserMapper } from "../mappers/user.mapper"

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {

    if (!input.name || input.name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.");
    }

    if (!input.email || !input.email.includes("@")) {
      throw new Error("Invalid email.");
    }

    const user = new User({
      id: crypto.randomUUID(),
      clerkUserId: input.clerkUserId,
      name: input.name,
      email: input.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.userRepository.create(user);

    return UserMapper.toDTO(createdUser);
  }
}
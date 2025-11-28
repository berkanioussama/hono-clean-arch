import { GetUserInputDTO } from "../dto/get-user.dto";
import { UserRepository } from "../../domain/user.repository";
import { GetUserOutputDTO } from "../dto/get-user.dto";
import { UserMapper } from "../mappers/user.mapper";

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: GetUserInputDTO): Promise<GetUserOutputDTO | null> {
    if (!input.id || input.id.trim().length === 0) {
      throw new Error("Invalid ID");
    }

    const user = await this.userRepository.findById(input.id);

    if (!user) return null;
    if (user.clerkUserId !== input.clerkUserId) {
        throw new Error("Unauthorized");
    }

    return UserMapper.toDTO(user);
  }
}
import { UserRepository } from "../../domain/user.repository";
import { GetUserOutputDTO } from "../dto/get-user.dto";
import { UserMapper } from "../mappers/user.mapper";

export class GetUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}
  
  async execute(email: string): Promise<GetUserOutputDTO | null> {
    if (!email || email.trim().length === 0) {
      throw new Error("Invalid email");
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
    return UserMapper.toDTO(user);
  }
}
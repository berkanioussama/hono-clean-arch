import { UserRepository } from "../../domain/user.repository";
import { DeleteUserInputDTO, DeleteUserOutputDTO } from "../dto/delete-user.dto";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: DeleteUserInputDTO): Promise<DeleteUserOutputDTO> {
    const user = await this.userRepository.findById(input.id);
    if (!user) throw new Error("User not found");

    await this.userRepository.delete(input.id);

    return {
      id: input.id,
      deletedAt: new Date().toISOString(),
    };
  }
}
import { UserRepository } from "../../domain/user.repository";

export class DeleteUserByClerkUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(clerkUserId: string): Promise<void> {
    const user = await this.userRepository.findByClerkUserId(clerkUserId);
    if (user) {
      await this.userRepository.delete(user.id);
    }
  }
}
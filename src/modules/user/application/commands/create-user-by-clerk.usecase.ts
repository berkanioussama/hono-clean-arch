import { User } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";

export class CreateUserByClerkUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(params: { clerkUserId: string; name?: string; email?: string }) {
    const existingUser = await this.userRepository.findByClerkUserId(params.clerkUserId);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new User({
      id: crypto.randomUUID(),
      clerkUserId: params.clerkUserId,
      name: params.name || '',
      email: params.email || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.userRepository.create(user);
  }
}
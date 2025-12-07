import { User } from "../../domain/user.entity"
import { IUserRepo } from "../../domain/IUser.repo"
import { CreateUserInputDTO } from "../dto/user-input.dto"
import { UserOutputDTO } from "../dto/user-output.dto";
import { Email } from "../../domain/user.vo";

export class CreateUserUC {
  constructor(private userRepository: IUserRepo) {}

  async execute(input: CreateUserInputDTO): Promise<UserOutputDTO> {

    if (!input.name || input.name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.");
    }

    const email = Email.create(input.email)

    const user = new User({
      id: crypto.randomUUID(),
      authProviderId: input.authProviderId,
      name: input.name,
      email: email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.userRepository.add(user)

    return createdUser.toJSON()
  }
}
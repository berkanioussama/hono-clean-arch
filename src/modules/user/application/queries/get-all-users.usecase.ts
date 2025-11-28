import { UserRepository } from "../../domain/user.repository";
import { GetUserOutputDTO } from "../dto/get-user.dto";
import { UserMapper } from "../mappers/user.mapper";

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<GetUserOutputDTO[]> {
    const users = await this.userRepository.getAll();

    const output: GetUserOutputDTO[] = users.map((user) => UserMapper.toDTO(user));

    return output;
  }
}
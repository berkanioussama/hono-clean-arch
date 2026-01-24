import { IUserRepo } from "../../domain/IUser.repo";
import { User } from "../../domain/user.entity";
import { ProviderId } from "../../domain/valueObject";

export class UserService {
  constructor(private userRepo: IUserRepo) {}

  async findUserByProviderId(providerId: string): Promise<User | null> {
    const providerIdVO = ProviderId.create(providerId)

    return this.userRepo.findByProviderId(providerIdVO);
  }
}
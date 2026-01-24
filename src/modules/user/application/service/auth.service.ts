import { IUserRepo } from "../../domain/IUser.repo";
import { Role } from "../../domain/user.entity";
import { ProviderId } from "../../domain/valueObject";
import { ForbiddenError } from "../../../../shared/domain/errors";

export class AuthService {
  constructor(private userRepo: IUserRepo ) {}

  async isAdmin(providerId: string): Promise<boolean> {
    const providerIdVO = ProviderId.create(providerId)
    const user = await this.userRepo.findByProviderId(providerIdVO);
    return user?.role === Role.ADMIN;
  }

  async requireAdmin(providerId: string): Promise<void> {
    const isAdmin = await this.isAdmin(providerId);
    if (!isAdmin) {
      throw new ForbiddenError("Admin access required");
    }
  }
}
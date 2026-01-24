import { IUserRepo } from "../../domain/IUser.repo";
import { NotFoundError } from "../../../../shared/domain/errors";
import { ProviderId } from "../../domain/valueObject";

export class RemoveUserByProviderIdUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(providerId: string): Promise<void> {
    const providerIdVO = ProviderId.create(providerId)
    const user = await this.userRepo.findByProviderId(providerIdVO)
    if (!user) throw new NotFoundError("User not found");
    
    await this.userRepo.removeByProviderId(providerIdVO)
  }
}
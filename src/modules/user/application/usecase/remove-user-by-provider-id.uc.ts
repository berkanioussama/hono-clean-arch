import { IUserRepo } from "../../domain/IUser.repo";

export class RemoveUserByProviderIdUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(providerId: string): Promise<void> {
    const user = await this.userRepo.findByProviderId(providerId);
    if (!user) throw new Error("User not found");
    
    await this.userRepo.removeByProviderId(providerId);
  }
}
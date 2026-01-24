import { IUserRepo } from "../../domain/IUser.repo";
import { NotFoundError } from "../../../../shared/domain/errors";

export class RemoveUserAdminUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundError("User not found");

    await this.userRepo.remove(id);
  }
}
import { IUserRepo } from "../../domain/IUser.repo";
import { NotFoundError } from "../../../../shared/domain/errors";
import { UserId } from "../../domain/valueObject";

export class RemoveUserAdminUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(id: string): Promise<void> {
    const userId = UserId.create(id)
    const user = await this.userRepo.findById(userId)
    if (!user) throw new NotFoundError("User not found");

    await this.userRepo.remove(userId)
  }
}
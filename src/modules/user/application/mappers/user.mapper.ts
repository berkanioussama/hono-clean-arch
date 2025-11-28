import { User } from "../../domain/user.entity";
import { GetUserOutputDTO } from "../dto/get-user.dto";

export class UserMapper {
  static toDTO(user: User): GetUserOutputDTO {
    return {
      id: user.id,
      clerkUserId: user.clerkUserId,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
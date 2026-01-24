import { User } from "../../domain/user.entity";
import { UserDTO } from "./user.dto";

export class UserDTOMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user.id.toString(),
      providerId: user.providerId.toString(),
      firstName: user.firstName.toString(),
      lastName: user.lastName.toString(),
      email: user.email.toString(),
      image: user.image?.toString(),
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDTOList(users: User[]): UserDTO[] {
    return users.map(user => this.toDTO(user));
  }
}
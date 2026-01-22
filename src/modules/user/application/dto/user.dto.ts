import { Role } from "../../domain/user.entity";
import { QuoteDTO } from "../../../quote/application/dto/quote.dto";

export interface UserDTO {
  id: string;
  providerId: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export type AddUserDTO = Omit<UserDTO, 'id' | 'role' | 'createdAt' | 'updatedAt'>;

export type EditUserAdminDTO =
  Pick<UserDTO, 'id' > &
  Partial< Omit<UserDTO, 'id' | 'providerId' | 'role' | 'createdAt' | 'updatedAt'> >;

export type EditUserDTO = 
  Pick<UserDTO, 'id' | 'providerId' > &
  Partial< Omit<UserDTO, 'id' | 'providerId' | 'role' | 'createdAt' | 'updatedAt'> >;

export type FindUserDTO = Pick<UserDTO, 'id' | 'providerId'>

export type FindUserByEmailDTO = Pick<UserDTO, 'email' | 'providerId'>

export interface UserProfileDTO {
  user: UserDTO;
  quotes: QuoteDTO[];
}
import { User } from "./user.entity"
import { IUserProfile } from "./IUser-profile"

export interface IUserRepo {
  add(user: User): Promise<User>
  edit(user: User): Promise<User>
  findAll(): Promise<User[]>
  findById(id: string): Promise<User | null>
  findByProviderId(providerId: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findProfileById(id: string): Promise<IUserProfile | null>
  findProfileByProviderId(providerId: string): Promise<IUserProfile | null>
  remove(id: string): Promise<void>
  removeByProviderId(providerId: string): Promise<void>
}
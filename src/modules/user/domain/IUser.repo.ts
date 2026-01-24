import { User } from "./user.entity"
import { IUserProfile } from "./IUser-profile"
import { ProviderId, Email, UserId } from "./valueObject"

export interface IUserRepo {
  add(user: User): Promise<User>
  edit(user: User): Promise<User>
  findAll(): Promise<User[]>
  findById(id: UserId): Promise<User | null>
  findByProviderId(providerId: ProviderId): Promise<User | null>
  findByEmail(email: Email): Promise<User | null>
  findProfileById(id: UserId): Promise<IUserProfile | null>
  findProfileByProviderId(providerId: ProviderId): Promise<IUserProfile | null>
  remove(id: UserId): Promise<void>
  removeByProviderId(providerId: ProviderId): Promise<void>
}
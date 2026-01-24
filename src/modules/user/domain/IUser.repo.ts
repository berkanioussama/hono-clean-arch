import { User } from "./user.entity"
import { IUserProfile } from "./IUser-profile"
import { ProviderId, Email } from "./valueObject"

export interface IUserRepo {
  add(user: User): Promise<User>
  edit(user: User): Promise<User>
  findAll(): Promise<User[]>
  findById(id: string): Promise<User | null>
  findByProviderId(providerId: ProviderId): Promise<User | null>
  findByEmail(email: Email): Promise<User | null>
  findProfileById(id: string): Promise<IUserProfile | null>
  findProfileByProviderId(providerId: ProviderId): Promise<IUserProfile | null>
  remove(id: string): Promise<void>
  removeByProviderId(providerId: ProviderId): Promise<void>
}
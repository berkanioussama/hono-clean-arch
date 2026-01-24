import { User } from "../domain/user.entity";
import { IUserRepo } from "../domain/IUser.repo";
import { db } from "../../../shared/infrastructure/database/db";
import { users } from "../../../shared/infrastructure/database/schema";
import { eq } from "drizzle-orm";
import { UserDBMapper } from "./user.db.mapper";
import { UserProfileDBMapper } from "./user-profile.db.mapper";
import { IUserProfile } from "../domain/IUser-profile";
import { Email, ProviderId, UserId } from "../domain/valueObject";

export class UserRepoImpl implements IUserRepo {
    
    async add(user: User): Promise<User> {
        const insertedUser = await db.insert(users).values({
            id: user.id.toString(),
            providerId: user.providerId.toString(),
            firstName: user.firstName.toString(),
            lastName: user.lastName.toString(),
            email: user.email.toString(),
            image: user.image?.toString(),
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }).returning();

        return UserDBMapper.toDomain(insertedUser[0]);
    }

    async edit(user: User): Promise<User> {
        const updatedUser = await db.update(users).set({
            firstName: user.firstName.toString(),
            lastName: user.lastName.toString(),
            email: user.email.toString(),
            image: user.image?.toString(),
            updatedAt: user.updatedAt,
        }).where(eq(users.id, user.id.toString())).returning();
        
        return UserDBMapper.toDomain(updatedUser[0]);
    }

    async findAll(): Promise<User[]> {
        const findedUsers = await db.select().from(users)
        return UserDBMapper.toDomainList(findedUsers)

    }
    
    async findById(id: UserId): Promise<User | null> {
        const findedUser = await db.select().from(users).where(eq(users.id, id.toString())).limit(1);
        if (findedUser.length === 0) return null

        return UserDBMapper.toDomain(findedUser[0])
    }

    async findByProviderId(providerId: ProviderId): Promise<User | null> {
        const findedUser = await db.select().from(users).where(eq(users.providerId, providerId.toString())).limit(1);
        if (findedUser.length === 0) return null

        return UserDBMapper.toDomain(findedUser[0])
    }

    async findProfileById(id: UserId): Promise<IUserProfile | null> {
        const findedUser = await db.query.users.findFirst({
            where: eq(users.id, id.toString()),
            with: {
                quotes: true
            }
        })
        if (!findedUser) return null

        return UserProfileDBMapper.toDomain(findedUser)
    }

    async findProfileByProviderId(providerId: ProviderId): Promise<IUserProfile | null> {
        const findedUser = await db.query.users.findFirst({
            where: eq(users.providerId, providerId.toString()),
            with: {
                quotes: true
            }
        })
        if (!findedUser) return null

        return UserProfileDBMapper.toDomain(findedUser)
    }
    
    async findByEmail(email: Email): Promise<User | null> {
        const findedUser = await db.select().from(users).where(eq(users.email, email.toString())).limit(1);
        if (findedUser.length === 0) return null

        return UserDBMapper.toDomain(findedUser[0])
    }

    async remove(id: UserId): Promise<void> {
        await db.delete(users).where(eq(users.id, id.toString()));
    }
    
    async removeByProviderId(providerId: ProviderId): Promise<void> {
        await db.delete(users).where(eq(users.providerId, providerId.toString()));
    }
}
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user-repository";
import { db } from "../database/db";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";

export class UserRepositoryImpl implements UserRepository {
    
    async create(user: User): Promise<User> {
        await db.insert(users).values({
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
        });
    return user;
    }
    
    async findById(id: string): Promise<User | null> {
        const row = await db.select().from(users).where(eq(users.id, id)).limit(1);
        if (row.length === 0) return null;
        const findedUser = row[0];

        return new User({
            id: findedUser.id,
            name: findedUser.name,
            email: findedUser.email,
            createdAt: new Date(findedUser.created_at),
            updatedAt: new Date(findedUser.updated_at),
        });
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const row = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (row.length === 0) return null;
        const findedUser = row[0];

        return new User({
            id: findedUser.id,
            name: findedUser.name,
            email: findedUser.email,
            createdAt: new Date(findedUser.created_at),
            updatedAt: new Date(findedUser.updated_at),
        });
    }
    
    async getAll(): Promise<User[]> {
        const rows = await db.select().from(users)
        return rows.map(
            row =>
                new User({
                    id: row.id,
                    name: row.name,
                    email: row.email,
                    createdAt: new Date(row.created_at),
                    updatedAt: new Date(row.updated_at),
                })
            );
    }
    
    async update(user: User): Promise<User> {
        await db.update(users).set({
            name: user.name,
            email: user.email,
            updated_at: user.updatedAt,
        }).where(eq(users.id, user.id));
        return user;
    }

    async delete(id: string): Promise<void> {
        await db.delete(users).where(eq(users.id, id));
    }
}
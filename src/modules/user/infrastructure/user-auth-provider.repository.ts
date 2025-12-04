import { User } from "../domain/user.entity";
import { db } from "../../../shared/infrastructure/database/db";
import { users } from "../../../shared/infrastructure/database/schema";
import { eq } from "drizzle-orm";
import { UserMapper } from "./user.mapper";

export class UserAuthProviderRepository {

    async findByAuthProviderId(authProviderId: string): Promise<User | null> {
        const findedUser = await db.select().from(users).where(eq(users.auth_provider_id, authProviderId)).limit(1);
        if (findedUser.length === 0) return null

        return UserMapper.toDomain(findedUser[0])
    }
}
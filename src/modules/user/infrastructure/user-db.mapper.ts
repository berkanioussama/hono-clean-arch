import { Role, User } from "../domain/user.entity";
import { InferSelectModel } from "drizzle-orm";
import { users } from "../../../shared/infrastructure/database/schema";
import { Email, ImageUrl, ProviderId, FirstName, LastName } from "../domain/valueObject";

type DBUser = InferSelectModel<typeof users>
    
export class UserDBMapper {
    
    static toDomain(dbUser: DBUser): User {
        const providerId = ProviderId.fromPersistence(dbUser.providerId)
        const email = Email.fromPersistence(dbUser.email)
        const firstName = FirstName.fromPersistence(dbUser.firstName)
        const lastName = LastName.fromPersistence(dbUser.lastName)
        const image = ImageUrl.fromPersistence(dbUser.image)
        
        return User.fromPersistence({
            id: dbUser.id,
            providerId: providerId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            image: image,
            role: dbUser.role as Role,
            createdAt: new Date(dbUser.createdAt),
            updatedAt: new Date(dbUser.updatedAt),
        });
    }

    static toDomainList(dbUsers: DBUser[]): User[] {
        return dbUsers.map(dbUser => this.toDomain(dbUser));
    }
}

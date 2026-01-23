import { InferSelectModel } from "drizzle-orm";
import { users } from "../../../shared/infrastructure/database/schema";
import { UserDBMapper } from "./user.db.mapper";
import { QuoteDBMapper } from "../../quote/infrastructure/quote.db.mapper";
import { IUserProfile } from "../domain/IUser-profile";

type DBUserWithQuotes = InferSelectModel<typeof users> & {
    quotes: any[]
}
    
export class UserProfileDBMapper {
    
    static toDomain(dbUserWithQuotes: DBUserWithQuotes): IUserProfile {
        const { quotes, ...userData } = dbUserWithQuotes;
        
        return {
            user: UserDBMapper.toDomain(userData),
            quotes: quotes.map(QuoteDBMapper.toDomain)
        };
    }

    static toDomainList(dbUsersWithQuotes: DBUserWithQuotes[]): IUserProfile[] {
        return dbUsersWithQuotes.map(dbUserWithQuotes => this.toDomain(dbUserWithQuotes));
    }
}
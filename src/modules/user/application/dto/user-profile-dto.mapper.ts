import { UserProfileDTO } from "./user.dto";
import { UserDTOMapper } from "./user-dto.mapper";
import { QuoteDTOMapper } from "../../../quote/application/dto/quote-dto.mapper";
import { IUserProfile } from "../../domain/IUser-profile";

export class UserProfileDTOMapper {
    static toDTO(userProfile: IUserProfile): UserProfileDTO {
        return {
            user: UserDTOMapper.toDTO(userProfile.user),
            quotes: userProfile.quotes.map(QuoteDTOMapper.toDTO)
        }
    }
}
import { Email, ImageUrl, ProviderId, FirstName, LastName, UserId } from './valueObject'
import { ValidationError } from "../../../shared/domain/errors";

export enum Role { USER = "user", ADMIN = "admin" }

export interface CreateUserProps {
  providerId: ProviderId;
  firstName: FirstName;
  lastName: LastName;
  email: Email;
  image: ImageUrl;
}
export interface UserProps extends CreateUserProps {
  id: UserId;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  static create(props: CreateUserProps): User {
    this.validate(props);
    return new User({
      ...props,
      id: UserId.generate(),
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static fromPersistence(props: UserProps): User {
    return new User(props);
  }

  private static validate(props: CreateUserProps) {
    if (!(props.providerId instanceof ProviderId)) {
      throw new ValidationError("Provider ID must be a ProviderId instance.");
    }
    if (!(props.firstName instanceof FirstName)) {
      throw new ValidationError("First Name must be a FirstName instance");
    }
    if (!(props.lastName instanceof LastName)) {
      throw new ValidationError("Last Name must be a LastName instance");
    }
    
    if (!(props.email instanceof Email)) {
      throw new ValidationError("Email must be an Email instance");
    }
    if (!(props.image instanceof ImageUrl)) {
      throw new ValidationError("Image must be an ImageUrl instance");
    }
  }

  changeFirstName(newFirstName: FirstName) {
    this.props.firstName = newFirstName;
    this.props.updatedAt = new Date();
  }

  changeLastName(newLastName: LastName) {
    this.props.lastName = newLastName;
    this.props.updatedAt = new Date();
  }

  changeEmail(newEmail: Email) {
    this.props.email = newEmail;
    this.props.updatedAt = new Date();
  }

  changeImage(newImage: ImageUrl) {
    this.props.image = newImage;
    this.props.updatedAt = new Date();
  }

  get id() { return this.props.id }
  get providerId() { return this.props.providerId }
  get firstName() { return this.props.firstName }
  get lastName() { return this.props.lastName }
  get email() { return this.props.email }
  get image() { return this.props.image }
  get role() { return this.props.role }
  get createdAt() { return this.props.createdAt }
  get updatedAt() { return this.props.updatedAt }
}
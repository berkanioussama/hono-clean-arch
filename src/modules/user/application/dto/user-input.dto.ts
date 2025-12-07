export interface CreateUserInputDTO {
  authProviderId: string;
  name: string;
  email: string;
}

export interface GetUserInputDTO {
  id: string;
  authProviderId: string;
}

export interface GetUserByAuthProviderInputDTO {
  authProviderId: string;
}

export interface GetUserByEmailInputDTO {
  email: string;
  authProviderId: string;
}

export interface UpdateUserInputDTO {
  id: string;
  name?: string;   // optional
  email?: string;  // optional
}

export interface DeleteUserInputDTO {
  id: string;
}

export interface DeleteUserByAuthProviderIdInputDTO {
  authProviderId: string;
}
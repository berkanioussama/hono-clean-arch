export interface CreateUserInputDTO {
  clerkUserId: string;
  name: string;
  email: string;
}

export interface CreateUserOutputDTO {
  id: string;
  clerkUserId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
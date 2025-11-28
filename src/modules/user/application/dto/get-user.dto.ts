export interface GetUserInputDTO {
  id: string;
  clerkUserId: string;
}

export interface GetUserOutputDTO {
  id: string;
  clerkUserId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
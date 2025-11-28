export interface UpdateUserInputDTO {
  id: string;
  name?: string;   // optional
  email?: string;  // optional
}

export interface UpdateUserOutputDTO {
  id: string;
  clerkUserId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
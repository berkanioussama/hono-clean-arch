import { Hono } from "hono";
import { UserAuthProviderRepo } from "../infrastructure/user-authProvider.repo";
import { GetUserByAuthProviderIdUC } from "../application/query/get-user-by-authProviderId.uc";
import { UserAuthProviderController } from "./user-authProvider.controller";

export const userAuthProviderRoutes = new Hono();

const userAuthProviderRepo = new UserAuthProviderRepo();
const getUserByAuthProviderIdUC = new GetUserByAuthProviderIdUC(userAuthProviderRepo);
const userAuthProviderController = new UserAuthProviderController(getUserByAuthProviderIdUC);

userAuthProviderRoutes.get("/:id", (c) => userAuthProviderController.getUserById(c));

export default userAuthProviderRoutes;
import { Hono } from "hono";
import { UserRepoImpl } from "../infrastructure/user-repo.impl";
import { AddUserAdminUC } from "../application/usecase/add-user-admin.uc";
import { EditUserAdminUC } from "../application/usecase/edit-user-admin.uc";
import { EditUserUC } from "../application/usecase/edit-user.uc";
import { RemoveUserAdminUC } from "../application/usecase/remove-user.uc";
import { FindUserByIdAdminUC } from "../application/usecase/find-user-by-id-admin.uc";
import { FindAllUsersAdminUC } from "../application/usecase/find-all-users-admin.uc";
import { FindUserByProviderIdUC } from "../application/usecase/find-user-by-provider-id.uc";
import { FindProfileByIdAdminUC } from "../application/usecase/find-profile-by-id-admin.uc";
import { UserController } from "./user.controller";
import { UserAdminController } from "./user-admin.controller";
import { requireAdminAuth } from "../../../shared/api/middlewares/auth.middleware";
import { AuthService } from "../application/service/auth.service";


export const userRoutes = new Hono();
export const userRoutesAdmin = new Hono();

const userRepo = new UserRepoImpl();

const addUserAdminUC  = new AddUserAdminUC(userRepo);
const editUserAdminUC  = new EditUserAdminUC(userRepo);
const findAllUsersAdminUC = new FindAllUsersAdminUC(userRepo);
const findUserByIdAdminUC = new FindUserByIdAdminUC(userRepo);
const findProfileByIdAdmin = new FindProfileByIdAdminUC(userRepo);
const removeUserAdminUC  = new RemoveUserAdminUC(userRepo);

const editUserUC  = new EditUserUC(userRepo);
const findUserByProviderIdUC = new FindUserByProviderIdUC(userRepo);
const findProfileByProviderIdUC = new FindUserByProviderIdUC(userRepo);

const authService = new AuthService(userRepo);

const userAdminController = new UserAdminController(
  addUserAdminUC,
  editUserAdminUC,
  findAllUsersAdminUC, 
  findUserByIdAdminUC, 
  findProfileByIdAdmin,
  removeUserAdminUC
)
const userController = new UserController(
  editUserUC,
  findUserByProviderIdUC,
  findProfileByProviderIdUC
)

userRoutes.put("/:id", (c) => userController.editUser(c) )
userRoutes.get("/providers/:id", (c) => userController.findUserByProviderId(c))
userRoutes.get("/providers/:id/profile", (c) => userController.findProfileByProviderId(c))

userRoutesAdmin.use('*', requireAdminAuth(authService));

userRoutesAdmin.post("/", (c) => userAdminController.addUserAdmin(c))
userRoutesAdmin.put("/:id", (c) => userAdminController.editUserAdmin(c) )
userRoutesAdmin.get("/", (c) => userAdminController.findAllUsersAdmin(c))
userRoutesAdmin.get("/:id", (c) => userAdminController.findUserByIdAdmin(c))
userRoutesAdmin.get("/:id/profile", (c) => userAdminController.findProfileByIdAdmin(c))
userRoutesAdmin.delete("/:id", (c) => userAdminController.removeUserAdmin(c))

export default userRoutes
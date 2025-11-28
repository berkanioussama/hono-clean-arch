import { getAuth } from '@hono/clerk-auth';
import { Context } from 'hono';
import { usersClerkService } from '../modules/users/users.clerk.service.js';
import { User } from '../modules/users/users.types.js';

export async function getConnectedUser(c: Context) {
  const auth = getAuth(c);
  if (!auth) return null;
  return await usersClerkService.getUserByClerkUserId(auth.userId as string) as User;
}

export async function getConnectedUserId(c: Context) {
  const auth = getAuth(c);
  if (!auth) return null;
  const user = await usersClerkService.getUserByClerkUserId(auth.userId as string) as User;
  return user.id;
}
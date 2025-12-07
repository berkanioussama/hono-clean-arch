import type { Context, Next } from "hono";
import { getAuth } from "@hono/clerk-auth";

export const requireAuth = () => {
  return async (c: Context, next: Next) => {
    const auth = getAuth(c)

    if (!auth || !auth.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    return next();
  };
};

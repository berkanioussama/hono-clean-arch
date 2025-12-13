import { pgTable, text, timestamp, index, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['user', 'admin']);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  auth_provider_id: text("auth_provider_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  image: text("image").notNull(),
  role: roleEnum('role').notNull().default('user'),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
}, (table) => [
  index("auth_provider_id_index").on(table.auth_provider_id),
])
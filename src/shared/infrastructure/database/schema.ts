import { pgTable, text, timestamp, index, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['user', 'admin']);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  providerId: text("provider_id").unique().notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  image: text("image").notNull(),
  role: roleEnum('role').notNull().default('user'),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
}, (table) => [
  index("provider_id_index").on(table.providerId),
])
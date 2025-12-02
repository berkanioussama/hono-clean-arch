import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  auth_provider_id: text("auth_provider_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
});
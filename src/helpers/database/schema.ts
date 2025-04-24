import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const Users = pgTable('users', {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
})

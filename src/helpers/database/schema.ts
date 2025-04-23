import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core'

export const Users = mysqlTable('users', {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
})

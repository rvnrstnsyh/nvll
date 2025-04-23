import mysql, { Pool, PoolOptions } from 'mysql2/promise'

import { drizzle, MySql2Database } from 'drizzle-orm/mysql2'

const credentials: PoolOptions = {
	host: Deno.env.get('DB_HOSTNAME') || '127.0.0.1',
	port: parseInt(Deno.env.get('DB_PORT') as string) || 3306,
	database: Deno.env.get('DB_NAME') || 'nvll',
	user: Deno.env.get('DB_USERNAME') || 'root',
	password: Deno.env.get('DB_PASSWORD') || '',
	connectionLimit: parseInt(Deno.env.get('DB_POOLSIZE') as string) || 10, // 10 connections.
	connectTimeout: parseInt(Deno.env.get('DB_TIMEOUT') as string) || 1000 * 30, // 30 seconds.
}

const mysql2: Pool = mysql.createPool(credentials as PoolOptions)
const orm: MySql2Database = drizzle({ client: mysql2 })

export const driver: Pool = mysql2
export default orm

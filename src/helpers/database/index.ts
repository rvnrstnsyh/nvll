import * as schema from './schemas/index.ts'

import client, { Options, PostgresType, Sql } from 'postgres'

import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'

const credentials: Options<Record<string, PostgresType>> = {
	host: Deno.env.get('DB_HOSTNAME') || '127.0.0.1',
	port: parseInt(Deno.env.get('DB_PORT') as string) || 5432,
	database: Deno.env.get('DB_NAME') || 'nvll',
	username: Deno.env.get('DB_USERNAME') || 'root',
	password: Deno.env.get('DB_PASSWORD') || '',
	max: parseInt(Deno.env.get('DB_POOLSIZE') as string) || 15, // 15 connections.
	connect_timeout: parseInt(Deno.env.get('DB_TIMEOUT') as string) || 1000 * 30, // 30 seconds.
}

const postgres: Sql = client(credentials)
const orm: PostgresJsDatabase<Record<string, unknown>> = drizzle({ client: postgres, schema })

export const driver: Sql = postgres
export default orm

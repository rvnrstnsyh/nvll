import * as schema from './schemas/index.ts'

import client, { Options, PostgresType, Sql } from 'postgres'

import { getEnv } from '../lib/environment.ts'
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'

const credentials: Options<Record<string, PostgresType>> = {
	host: getEnv.string('/app/db/hostname'),
	port: getEnv.number('/app/db/port'),
	database: getEnv.string('/app/db/name'),
	username: getEnv.string('/app/db/username'),
	password: getEnv.string('/app/db/password'),
	max: getEnv.number('/app/db/pool_size'),
	connect_timeout: getEnv.number('/app/db/timeout'),
}

const postgres: Sql = client(credentials)
const orm: PostgresJsDatabase<Record<string, unknown>> = drizzle({ client: postgres, schema })

export const driver: Sql = postgres
export default orm

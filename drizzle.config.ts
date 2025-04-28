import { defineConfig } from 'drizzle-kit'
import { getEnv } from './src/helpers/lib/environment.ts'

export default defineConfig({
	out: '_drizzle',
	schema: 'src/database/schemas/**/*schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: getEnv.string('/app/db/url'),
	},
})

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	out: 'src/helpers/database/drizzle',
	schema: 'src/helpers/database/schema.ts',
	dialect: 'mysql',
	dbCredentials: {
		url: Deno.env.get('DB_URL') as string,
	},
})

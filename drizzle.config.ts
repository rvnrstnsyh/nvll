import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	out: 'src/helpers/database/drizzle',
	schema: 'src/helpers/database/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: Deno.env.get('DB_URL') as string,
	},
})

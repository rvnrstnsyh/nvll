import { Store } from 'confidence'

/**
 * Environment configuration using Confidence library,
 * organized with type-safe access patterns and strict TypeScript.
 */

// Define strict types for our environment values.
type KVConfig = {
	access_token: string | undefined
	access_url: string | undefined
}

type DBConfig = {
	url: string
	hostname: string
	port: number
	name: string
	username: string
	password: string
	pool_size: number
	timeout: number
}

type AppConfig = {
	name: string
	env: string
	port: number
	hostname: string
	hostname_v3: string
	origins: string[]
	write_csp_report: boolean
	client_scripts: boolean
	db: DBConfig
}

type EnvConfig = {
	deno: {
		kv: KVConfig
	}
	app: AppConfig
}

// Create type-safe environment default values.
const environment: EnvConfig = {
	// Deno.
	deno: {
		kv: {
			access_token: Deno.env.get('DENO_KV_ACCESS_TOKEN') ?? undefined,
			access_url: Deno.env.get('DENO_KV_ACCESS_URL') ?? undefined,
		},
	},
	// App.
	app: {
		name: String(Deno.env.get('APP_NAME')) ?? 'nvll',
		env: String(Deno.env.get('APP_ENV')).toLowerCase() ?? 'development',
		port: Number(Deno.env.get('APP_PORT')) || 5173,
		hostname: String(Deno.env.get('APP_HOSTNAME')).toLowerCase() ?? '127.0.0.1',
		hostname_v3: String(Deno.env.get('APP_HOSTNAME_V3')).toLowerCase() ?? 'example.onion',
		origins: Deno.env.get('APP_ORIGINS')?.split(',').map((origin: string): string => origin.toLowerCase().trim()) ?? ['http://localhost', 'http://127.0.0.1'],
		write_csp_report: String(Deno.env.get('APP_WRITE_CSP_REPORT')).toLowerCase() === 'true',
		client_scripts: String(Deno.env.get('APP_CLIENT_SCRIPTS')).toLowerCase() !== 'false', // Default to true unless explicitly set to false.
		// Database.
		db: {
			url: String(Deno.env.get('DB_URL')).toLowerCase() ?? 'postgresql://root@127.0.0.1:5432/nvll',
			hostname: String(Deno.env.get('DB_HOSTNAME')).toLowerCase() ?? '127.0.0.1',
			port: Number(Deno.env.get('DB_PORT')) || 5432,
			name: String(Deno.env.get('DB_NAME')) ?? 'nvll',
			username: String(Deno.env.get('DB_USERNAME')) ?? 'root',
			password: String(Deno.env.get('DB_PASSWORD')) ?? '',
			pool_size: Number(Deno.env.get('DB_POOLSIZE')) || 15,
			timeout: Number(Deno.env.get('DB_TIMEOUT')) || 30000,
		},
	},
}

// Create store instance once.
const store: typeof Store = new Store(environment)

// Type guards for value validation.
const typeGuards = {
	isString: (value: unknown): value is string => typeof value === 'string',
	isNumber: (value: unknown): value is number => typeof value === 'number' && !isNaN(value),
	isBoolean: (value: unknown): value is boolean => typeof value === 'boolean',
	isStringArray: (value: unknown): value is string[] => Array.isArray(value) && value.every((item): item is string => typeof item === 'string'),
}

/**
 * Generic typed getter for environment values.
 */
export function env<T>(key: string): T | undefined {
	const value: string = store.get(key)
	return value as T | undefined
}

/**
 * Type-safe accessor functions with default values.
 */
export const getEnv = {
	string: (key: string, defaultValue = ''): string => {
		const value: string = store.get(key)
		return typeGuards.isString(value) ? value : defaultValue
	},

	number: (key: string, defaultValue = 0): number => {
		const value: string = store.get(key)
		return typeGuards.isNumber(value) ? value : defaultValue
	},

	boolean: (key: string, defaultValue = false): boolean => {
		const value: string = store.get(key)
		return typeGuards.isBoolean(value) ? value : defaultValue
	},

	stringArray: (key: string, defaultValue: string[] = []): string[] => {
		const value: string = store.get(key)
		return typeGuards.isStringArray(value) ? value : defaultValue
	},
}

// Cached access for frequently used values.
export const cachedEnv = {
	app: {
		isProduction: getEnv.string('/app/env') === 'production',
		isDevelopment: getEnv.string('/app/env') === 'development',
		useDarkNet: /^[a-z2-7]{56}\.onion$/.test(getEnv.string('/app/hostname_v3')),
		// ...
	},
	db: {
		name: getEnv.string('/app/db/name'),
		// ...
	},
}

// Export type definitions for strong typing.
export type { AppConfig, DBConfig, EnvConfig as Environment, KVConfig }

// Export the full environment object.
export default environment

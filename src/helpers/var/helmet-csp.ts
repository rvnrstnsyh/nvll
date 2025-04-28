import { getEnv } from '../lib/environment.ts'

/**
 * Helmet configuration.
 *
 * Uses conditional configuration based on APP_CLIENT_SCRIPTS:
 * - false: Strict security mode (default)
 * - true: Mode that allows client-side JavaScript
 */

// Determine if client-side scripts are allowed based on environment variable.
const APP_CLIENT_SCRIPTS: Readonly<boolean> = getEnv.boolean('/app/client_scripts')

// Basic security headers.
const commonHeaders: [string, string][] = [
	['Cache-Control', 'no-store, max-age=0'],
	['Expect-CT', 'max-age=86400, enforce'],
	['Expires', '0'],
	['Pragma', 'no-cache'],
	['Strict-Transport-Security', 'max-age=15552000; includeSubDomains; preload'],
	['X-Content-Type-Options', 'nosniff'],
	['X-DNS-Prefetch-Control', 'off'],
	['X-Download-Options', 'noopen'],
	['X-Frame-Options', 'SAMEORIGIN'],
	['X-Permitted-Cross-Domain-Policies', 'none'],
	['X-XSS-Protection', '1; mode=block'],
]

// Conditional headers based on APP_CLIENT_SCRIPTS.
const conditionalHeaders: [string, string][] = [
	['Cross-Origin-Embedder-Policy', APP_CLIENT_SCRIPTS ? 'unsafe-none' : 'require-corp'],
	['Cross-Origin-Opener-Policy', APP_CLIENT_SCRIPTS ? 'same-origin-allow-popups' : 'same-origin'],
	['Cross-Origin-Resource-Policy', APP_CLIENT_SCRIPTS ? 'cross-origin' : 'same-origin'],
	['Referrer-Policy', APP_CLIENT_SCRIPTS ? 'no-referrer-when-downgrade' : 'no-referrer'],
	['Timing-Allow-Origin', APP_CLIENT_SCRIPTS ? '*' : 'same-origin'],
]

// Strict-only headers.
const strictOnlyHeaders: [string, string][] = APP_CLIENT_SCRIPTS ? [] : [
	['Origin-Agent-Cluster', '?1'],
]

// CORS headers only in client scripts mode.
const corsHeaders: [string, string][] = APP_CLIENT_SCRIPTS
	? [
		['Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'],
	]
	: []

// Base CSP that is the same in both modes.
const baseCSP: Record<string, string> = {
	'default-src': "'self'",
	'form-action': "'self'",
	'frame-ancestors': "'self'",
	'base-uri': "'self'",
	'report-uri': '/api/v0/csp/report',
	'report-to': '/api/v0/csp/report',
	'manifest-src': "'self'",
	'upgrade-insecure-requests': '',
	'object-src': "'none'",
}

// CSP for mode with client scripts.
const clientScriptsCSP: Record<string, string> = {
	'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
	'script-src-attr': "'unsafe-inline'",
	'style-src': "'self' https: 'unsafe-inline'",
	'img-src': "'self' data: https: http: blob:",
	'connect-src': "'self' https: http: ws: wss:",
	'font-src': "'self' https: data:",
	'media-src': "'self' https: http:",
	'frame-src': "'self'",
	'child-src': "'self'",
	'worker-src': "'self' blob:",
}

// CSP for strict mode.
const strictCSP: Record<string, string> = {
	'script-src': "'self'",
	'script-src-attr': "'none'",
	'style-src': "'self' https: 'unsafe-inline'",
	'img-src': "'self' data:",
	'connect-src': "'none'",
	'font-src': "'self' https: data:",
	'media-src': "'none'",
	'frame-src': "'none'",
	'sandbox': 'allow-forms allow-same-origin',
	'child-src': "'none'",
	'worker-src': "'none'",
}

// Combine all headers.
export const HELMET_DEFAULT_HEADERS: Readonly<Map<string, string>> = new Map([
	...commonHeaders,
	...conditionalHeaders,
	...strictOnlyHeaders,
	...corsHeaders,
])

// Combine basic CSP with mode-specific CSP.
export const HELMET_CSP_DIRECTIVES: Readonly<Record<string, string>> = Object.freeze({
	...baseCSP,
	...(APP_CLIENT_SCRIPTS ? clientScriptsCSP : strictCSP),
})

// Permissions policy based on initial program.
export const HELMET_PERMISSIONS_POLICY: Readonly<string> = ''

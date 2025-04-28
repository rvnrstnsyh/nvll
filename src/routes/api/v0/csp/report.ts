import { FreshContext } from '$fresh/server.ts'
import { getEnv } from '../../../../helpers/lib/environment.ts'

interface CspReportData {
	'timestamp': string
	'ip': string
	'user-agent': string
	'document-uri': string
	'referrer': string
	'violated-directive': string
	'effective-directive': string
	'original-policy': string
	'disposition': string
	'blocked-uri': string
	'line-number'?: number
	'source-file'?: string
	'status-code'?: number
	'column-number'?: number
}

interface CspReport {
	'csp-report': CspReportData
}

const LOG_DIR: string = './src/logs'
const LOG_FILE: string = `${LOG_DIR}/csp-reports.log`

export const handler = {
	/**
	 * @description Logs Content Security Policy (CSP) violation reports. This endpoint accepts CSP reports in
	 * JSON format and logs them to a file. The format of the log file is a JSON object per line,
	 * with all properties from the CSP report, plus the client IP and user agent.
	 * @example POST /csp/report HTTP/1.1
	 * Content-Type: application/json
	 * X-Forwarded-For: 192.0.2.1
	 * User-Agent: Mozilla/5.0
	 *
	 * {
	 *   "csp-report": {
	 *     "document-uri": "https://example.com/",
	 *     "referrer": "https://example.com/",
	 *     "violated-directive": "script-src 'self'",
	 *     "effective-directive": "script-src 'self'",
	 *     "original-policy": "script-src 'self'; report-uri /csp/report",
	 *     "disposition": "enforce",
	 *     "blocked-uri": "https://evil.com/evil.js",
	 *     "line-number": 1,
	 *     "source-file": "https://example.com/script.js",
	 *     "status-code": 200
	 *   }
	 * }
	 * @returns A 204 No Content response.
	 */
	async POST(request: Request, ctx: FreshContext): Promise<Response> {
		try {
			// Check if logging is enabled early to avoid unnecessary processing.
			if (!getEnv.boolean('/app/write_csp_report')) return new Response(null, { status: 204 })
			// Extract required headers once.
			const headers: Headers = request.headers
			const remoteIp: Readonly<string> = headers.get('X-Forwarded-For') || ctx.remoteAddr.hostname
			const userAgent: Readonly<string> = headers.get('user-agent') || 'Unknown'
			// Parse body and create log entry in one pass.
			const { 'csp-report': report }: CspReport = await request.json() as CspReport
			const logEntry: CspReportData = {
				'timestamp': new Date().toISOString(),
				'ip': remoteIp,
				'user-agent': userAgent,
				'document-uri': report['document-uri'],
				'referrer': report.referrer,
				'violated-directive': report['violated-directive'],
				'effective-directive': report['effective-directive'],
				'original-policy': report['original-policy'],
				'disposition': report.disposition,
				'blocked-uri': report['blocked-uri'],
				...(report['line-number'] && { 'line-number': report['line-number'] }),
				...(report['source-file'] && { 'source-file': report['source-file'] }),
				...(report['status-code'] && { 'status-code': report['status-code'] }),
				...(report['column-number'] && { 'column-number': report['column-number'] }),
			}
			// Ensure directory exists and write log atomically.
			await Deno.mkdir(LOG_DIR, { recursive: true })
			await Deno.writeTextFile(LOG_FILE, JSON.stringify(logEntry, null, 2) + '\n', { append: true })
			return new Response(null, { status: 204 })
		} catch (error) {
			// deno-lint-ignore no-console
			console.error('CSP report error:', error instanceof Error ? error.message : error)
			return new Response('500 Internal Server Error', { status: 500 })
		}
	},
}

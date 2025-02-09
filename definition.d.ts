import { Context } from './src/fresh.context.ts'

declare global {
	interface State {
		context: Context
		user?: {
			id: string
			name: string
			email: string
		}
		authenticated?: boolean
	}
}

export {}

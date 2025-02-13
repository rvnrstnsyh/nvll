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
	interface Post {
		slug: string | undefined
		title: string | undefined
		published_at: Date
		author: string | undefined
		contact: string | undefined
		content: string | undefined
		snippet: string | undefined
	}
}

export {}

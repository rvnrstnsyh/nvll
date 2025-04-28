import { cachedEnv } from './helpers/lib/environment.ts'

export class Context {
	public initialized: boolean = false
	public useDarkNet: Readonly<boolean> = cachedEnv.app.useDarkNet

	private static instance: Context | null = null

	// Singleton.
	private constructor() {}

	/**
	 * @description Initializes the context.
	 * @returns A promise that resolves when the context is fully initialized.
	 * @throws If initialization takes longer than 1 second.
	 */
	private async startUp(): Promise<void> {
		if (this.initialized) return
		try {
			await Promise.race([
				// Context must be ready in 1 second or abort.
				new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout!')), 1000)),
				new Promise((resolve: (value: void | PromiseLike<void>) => void): void => {
					// Presumably this involves connecting to a database or doing some heavy computation.
					setTimeout(() => {
						this.initialized = true
						resolve()
					}, 250)
				}),
			])
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : 'Failed to initialize Context.')
		}
	}

	/**
	 * @description Gets the singleton instance of the Context, initializing it if necessary.
	 * @returns A promise resolving to the Context instance.
	 */
	public static async initialize(): Promise<Context> {
		if (!this.instance) {
			this.instance = new Context()
			await this.instance.startUp()
		}
		return this.instance
	}

	/**
	 * @description Disposes the Context instance, if initialized.
	 * This method:
	 * 1. Resets the `initialized` flag to false.
	 * 2. Sets the static `instance` property to null.
	 *
	 * Use this method to manually dispose the Context instance,
	 * e.g. when you're done using it in a test or in a situation where
	 * you want to ensure the instance is released.
	 */
	public dispose(): void {
		if (this.initialized) {
			this.initialized = false
			Context.instance = null
		}
	}
}

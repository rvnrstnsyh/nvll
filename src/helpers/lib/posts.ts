import { extract } from '$std/front_matter/yaml.ts'
import { dirname, fromFileUrl, join } from '$std/path/mod.ts'

const directory: string = join(dirname(fromFileUrl(import.meta.url)), '../../posts')

/**
 * Finds and returns a post by its slug.
 *
 * @description This function reads a markdown file corresponding to the given slug from the posts directory,
 * extracts its front matter and body, and constructs a `Post` object with the extracted data.
 * @param slug - The unique identifier for the post, used to locate its markdown file.
 * @return {Promise<Post | null>} A promise resolving to the `Post` object if found, or `null` if not found.
 */
export async function findPost(slug: string): Promise<Post | null> {
	try {
		const filePath: string = join(directory, `${slug}.md`)
		const text: string = await Deno.readTextFile(filePath)
		const { attrs, body }: { attrs: Post; body: string } = extract(text)

		return {
			slug,
			title: attrs.title || undefined,
			published_at: new Date(attrs.published_at) || undefined,
			author: attrs.author || undefined,
			contact: attrs.contact || undefined,
			content: body || undefined,
			snippet: attrs.snippet || undefined,
		}
	} catch (_error) {
		return null
	}
}

/**
 * Retrieves and returns a list of all posts.
 *
 * @description This function reads all markdown files from the posts directory, extracts their front matter
 * and body, and constructs an array of `Post` objects with the extracted data. The posts are sorted in
 * descending order by their publication date.
 * @return {Promise<Post[]>} A promise resolving to an array of `Post` objects.
 */
export async function findPosts(): Promise<Post[]> {
	try {
		const files: AsyncIterable<Deno.DirEntry> = Deno.readDir(directory)
		const promises: Promise<Post | null>[] = []

		for await (const file of files) promises.push(findPost(file.name.replace('.md', '')))

		const posts: (Post | null)[] = await Promise.all(promises)
		const validPosts: Post[] = posts.filter((post: Post | null): post is Post => post !== null)

		validPosts.sort((a: Post, b: Post) => b.published_at.getTime() - a.published_at.getTime())
		return validPosts
	} catch (_error) {
		return []
	}
}

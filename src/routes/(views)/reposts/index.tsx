import PostCard from './(_components)/post-card.tsx'
import BackButton from './(_components)/back-button.tsx'

import { JSX } from 'preact/jsx-runtime'
import { findPosts } from '../../../helpers/lib/posts.ts'
import { defineRoute, RouteContext } from '$fresh/server.ts'

export default defineRoute(async (_request: Request, _ctx: RouteContext<void, unknown>): Promise<JSX.Element> => {
	const posts: Post[] = await findPosts()

	return (
		<section>
			<BackButton title='Home' href='/' />
			<article>
				<h1>
					re<span className='text-red-500'>.</span>Posts
				</h1>
				<div className='mt-8'>
					{posts.length <= 0 ? <p className='paragraph text-gray-400'>No posts found.</p> : (
						posts.map((post: Post) => <PostCard post={post} />)
					)}
				</div>
			</article>
		</section>
	)
})

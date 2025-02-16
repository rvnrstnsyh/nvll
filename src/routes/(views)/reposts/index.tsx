import BackButton from './(_components)/back-button.tsx'
import PublishedAt from './(_components)/published-at.tsx'

import { JSX } from 'preact/jsx-runtime'
import { findPosts } from '../../../helpers/lib/posts.ts'
import { defineRoute, RouteContext } from '$fresh/server.ts'

export default defineRoute(async (_request: Request, _ctx: RouteContext<void, unknown>): Promise<JSX.Element> => {
	const posts: Post[] = await findPosts()

	return (
		<section className='post-lists'>
			<BackButton title='Home' href='/' />
			<h1>
				re<span className='red'>.</span>Posts
			</h1>
			{posts.length >= 1 && posts.map((post: Post): JSX.Element => (
				<div className='post-card' key={post.slug}>
					<a className='title' href={`/reposts/${post.slug}`}>
						<h4>{post.title}</h4>
					</a>
					<PublishedAt date={post.published_at} />
					<div className='snippet'>{post.snippet}</div>
				</div>
			))}
		</section>
	)
})

import BackButton from '../(_components)/back-button.tsx'
import PublishedAt from '../(_components)/published-at.tsx'

import { Head } from '$fresh/runtime.ts'
import { JSX } from 'preact/jsx-runtime'
import { findPost } from '../../../../helpers/lib/posts.ts'
import { defineRoute, RouteContext } from '$fresh/server.ts'
import { CSS, KATEX_CSS, render, RenderOptions } from '$gfm'

export default defineRoute(async (_request: Request, ctx: RouteContext<void, unknown>): Promise<JSX.Element | Response> => {
	const post: Post | null = await findPost(ctx.params.slug)

	if (!post) return new Response('404 Not Found', { status: 404 })

	const options: RenderOptions = { allowMath: true }
	const markdown: { __html: string } = { __html: post.content ? render(post.content, options) : '' }

	return (
		<>
			<Head>
				<style dangerouslySetInnerHTML={{ __html: CSS + KATEX_CSS }} />
			</Head>
			<section className='post-page'>
				<BackButton title='Back' href='/cupoftea' />
				<article>
					<h1>{post.title}</h1>
					<div className='author-date'>
						<PublishedAt date={post.published_at} />
						&nbsp;—&nbsp;
						<em>
							by {post.contact ? <a className='anchor-text' href={post.contact}>{post.author}</a> : post.author}
						</em>
					</div>
					<div data-color-mode='light' data-light-theme='light' className='markdown-body' dangerouslySetInnerHTML={markdown} />
				</article>
			</section>
		</>
	)
})

import BackButton from '../(_components)/back-button.tsx'

import { Head } from '$fresh/runtime.ts'
import { JSX } from 'preact/jsx-runtime'
import { CSS, KATEX_CSS, render, RenderOptions } from '$gfm'
import { findPost } from '../../../../helpers/lib/posts.ts'
import { defineRoute, RouteContext } from '$fresh/server.ts'

export default defineRoute(async (_request: Request, ctx: RouteContext<void, unknown>): Promise<JSX.Element | Response> => {
	const post: Post | null = await findPost(ctx.params.slug)

	if (!post) return new Response('404 Not Found', { status: 404 })

	const options: RenderOptions = { allowMath: true }
	const markdown: { __html: string } = { __html: post.content ? render(post.content, options) : '' }

	return (
		<>
			<Head>
				<style dangerouslySetInnerHTML={{ __html: `${CSS} ${KATEX_CSS}` }} />
			</Head>
			<section>
				<BackButton title='Back' href='/reposts' />
				<article>
					<h1 className='text-5xl font-bold'>{post.title}</h1>
					<div className='text-gray-400'>
						<time>
							{new Date(post.published_at).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}
						</time>
						&nbsp;—&nbsp;
						<em>
							by {post.contact !== undefined ? <a className='anchor-text' href={post.contact}>{post.author}</a> : post.author}
						</em>
					</div>
					<div data-color-mode='light' data-light-theme='light' className='mt-8 markdown-body' dangerouslySetInnerHTML={markdown} />
				</article>
			</section>
		</>
	)
})

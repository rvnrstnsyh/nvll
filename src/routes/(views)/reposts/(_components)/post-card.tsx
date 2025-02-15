import { JSX } from 'preact/jsx-runtime'

type PostCardProps = { post: Post }

export default function PostCard({ post }: PostCardProps): JSX.Element {
	return (
		<div className='py-8 border(t gray-200)'>
			<a className='sm:col-span-2' href={`/reposts/${post.slug}`}>
				<h4 className='anchor-text'>{post.title}</h4>
			</a>
			<time className='text-gray-400'>
				{new Date(post.published_at).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}
			</time>
			<div className='paragraph mt-2'>{post.snippet}</div>
		</div>
	)
}

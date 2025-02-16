import { JSX } from 'preact/jsx-runtime'
import { asset } from '$fresh/runtime.ts'

type BackButtonProps = { title: string; href: string }

export default function BackButton({ title, href }: BackButtonProps): JSX.Element {
	return (
		<div className='back-button'>
			<a href={href} className='anchor-1'>
				<img src={asset('/png/arrow-left.png')} alt='Arrow Left' />
				{title}
			</a>
			{title !== 'Home' && (
				<a href={href} className='anchor-2'>
					<h3>
						re<span className='red'>.</span>Posts
					</h3>
				</a>
			)}
		</div>
	)
}

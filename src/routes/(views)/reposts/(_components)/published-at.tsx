import { JSX } from 'preact/jsx-runtime'

type PublishedAtProps = { date: Date }

export default function PublishedAt({ date }: PublishedAtProps): JSX.Element {
	return (
		<time>
			{new Date(date).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}
		</time>
	)
}

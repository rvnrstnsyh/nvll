import { JSX } from 'preact/jsx-runtime'

type AvailabilityIndicatorProps = {
	active?: boolean
	small?: boolean
}

export default function AvailabilityIndicator({ active, small }: AvailabilityIndicatorProps): JSX.Element {
	const color: string = active ? 'bg-yellow-green' : 'bg-red-500'
	const size: string = small ? 'w-1.5 h-1.5' : 'w-2.5 h-2.5'

	return (
		<div className={`availability-indicator ${color} ${size}`} title={active ? 'Online (last ping 5 minutes ago)' : 'Offline (last ping 17 minutes ago)'}>
			<span className={`dot ${color} ${size}`}></span>
		</div>
	)
}

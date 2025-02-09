import { JSX } from 'preact/jsx-runtime'

export default function PrimaryButton({ className, disabled, children, ...props }: JSX.HTMLAttributes<HTMLButtonElement>): JSX.Element {
	return (
		<button {...props} className={`primary-button ${disabled && 'opacity-25'} ` + className} disabled={disabled}>
			{children}
		</button>
	)
}

import CheckCircle from '@/assets/svg/CheckCircle'

interface Step {
  name: string
  description?: string
}

interface Props {
  steps: Step[]
  currentStep: number
}

export default function SignUpStep({ steps, currentStep }: Props) {
  return (
    <ol className="my-2 flex w-full items-center text-center text-xs font-medium text-gray-400">
      {steps.map((step, index) => {
        const isCompleted: boolean = index < currentStep
        const isActive: boolean = index === currentStep
        const isLastStep: boolean = index === steps.length - 1

        return (
          <li
            key={index}
            className={`flex items-center ${isCompleted ? 'text-gray-600' : 'text-gray-400'} ${isActive ? 'font-bold !text-blue-400' : ''}`}
          >
            <span className="flex items-center">
              {isCompleted ? <CheckCircle className="me-2.5 h-3.5 w-3.5" /> : <span className="me-2">{index + 1}</span>}
              {step.name}
              {step.description && <span className="ms-1 inline-flex">{step.description}</span>}
            </span>
            {!isLastStep && <span className="after:mx-1.5 after:text-gray-200 after:content-['/']"></span>}
          </li>
        )
      })}
    </ol>
  )
}

interface Props {
  title: string
  subtitle: string
}

export default function EntranceHead({ title, subtitle }: Props): JSX.Element {
  return (
    <div>
      <h1 className="my-2 text-3xl">{title}</h1>
      <p className="-mt-1 mb-2 text-justify text-sm text-gray-400">{subtitle}</p>
      <hr className="border-t-2" />
    </div>
  )
}

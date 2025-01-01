import { identicon } from '@dicebear/collection'
import { createAvatar, Result } from '@dicebear/core'
import { ReactElement } from 'react'

interface Props {
  className: string
  seed: string
  scale?: number
  size?: number
  radius?: number
}

/**
 * Generates an avatar based on the provided seed using the Bottts Neutral avatar style from DiceBear.
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Class name(s) to apply to the rendered element
 * @param {string} props.seed - Seed value to generate the avatar, typically a user ID or username
 * @param {number} [props.scale=100] - Scale of the generated avatar, defaults to 100
 * @param {number} [props.size=30] - Size of the generated avatar, defaults to 30
 * @param {number} [props.radius=10] - Radius of the generated avatar, defaults to 10
 *
 * @returns {ReactElement} An `<img>` element with the generated avatar
 */
export default function Identicon({ className, seed, scale = 100, size = 30, radius = 10 }: Props): ReactElement {
  const avatar: Result = createAvatar(identicon, { seed, scale, size, radius, backgroundColor: ['transparent'] })
  return <img className={className} src={avatar.toDataUri()} alt="User Avatar" />
}

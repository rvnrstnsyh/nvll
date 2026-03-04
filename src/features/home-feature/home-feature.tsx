import type { ReactNode } from 'react'

import { HomeTemplate } from '@/components/templates/home-template'

import { homeFeatureStyles } from './home-feature.styles'

import type { HomeFeatureProps } from './home-feature.types'

export function HomeFeature({ className, ...props }: HomeFeatureProps): ReactNode {
  // Business logic here (if needed)
  // const [data, setData] = useState()
  // useEffect(() => { fetchData() }, [])

  return (
    <main nvll-ui="home-feature" className={homeFeatureStyles({ className })} {...props}>
      <HomeTemplate />
    </main>
  )
}

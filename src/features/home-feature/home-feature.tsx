import type { ReactNode } from 'react'

import { HomeLayout } from '@/components/templates/home-layout'

import { homeFeatureStyles } from './home-feature.styles'

import type { HomeFeatureProps } from './home-feature.types'

export function HomeFeature({ className, ...props }: HomeFeatureProps): ReactNode {
  // Business logic here (if needed)
  // const [data, setData] = useState()
  // useEffect(() => { fetchData() }, [])

  return (
    <main nvll-ui="home-feature" className={homeFeatureStyles({ className })} {...props}>
      <HomeLayout />
    </main>
  )
}

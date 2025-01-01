import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { RouteName } from 'ziggy-js'
import { route } from '../../vendor/tightenco/ziggy'
import { ZeroTrustProvider } from './Context/ZeroTrust'

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title: string) => `${title} | ${import.meta.env.VITE_APP_NAME || 'Non-Violable Liberty Layers'}`,
    resolve: (name: string) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup: ({ App, props }) => {
      /* eslint-disable */
      // @ts-expect-error
      global.route<RouteName> = (name, params, absolute) => route(name, params as any, absolute, {
        ...page.props.ziggy,
        location: new URL(page.props.ziggy.location),
      });
      /* eslint-enable */
      return (
        <ZeroTrustProvider>
          <App {...props} />
        </ZeroTrustProvider>
      )
    }
  })
)

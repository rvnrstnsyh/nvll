import 'preline'
import '../css/app.css'
import './bootstrap'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { ZeroTrustProvider } from './Context/ZeroTrust'

createInertiaApp({
  title: (title: string) => `${title} | ${import.meta.env.VITE_APP_NAME || 'Non-Violable Liberty Layers'}`,
  resolve: (name: string) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    const node: JSX.Element = (
      <ZeroTrustProvider>
        <App {...props} />
      </ZeroTrustProvider>
    )
    if (import.meta.env.SSR) {
      hydrateRoot(el, node)
      return
    }
    createRoot(el).render(node)
  },
  progress: {
    // The delay after which the progress bar will appear, in milliseconds...
    delay: 250,
    // The color of the progress bar...
    color: '#4B5563',
    // Whether to include the default NProgress styles...
    includeCSS: true,
    // Whether the NProgress spinner will be shown...
    showSpinner: false
  }
})

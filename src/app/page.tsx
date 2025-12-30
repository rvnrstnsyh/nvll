import ThemeSwitcher from '@/components/csr/theme-switcher'

import { JSX } from 'react'

export default function Home(): JSX.Element {
  return (
    <main className="home-page">
      <div className="home-card" role="alert" tabIndex={-1} aria-labelledby="hs-discovery-label">
        <div className="home-row">
          <div className="home-icon">
            <ThemeSwitcher />
          </div>
          <div className="home-content">
            <h3 id="hs-discovery-label" className="home-title">
              Non-Violable Liberty Layers
            </h3>
            <p className="home-subtitle">Privacy-oriented public service designed with user security and privacy in mind</p>
          </div>
        </div>
      </div>
    </main>
  )
}

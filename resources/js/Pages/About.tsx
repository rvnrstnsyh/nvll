import Quote from '@/assets/svg/Quote'
import PrimaryButton from '@/Components/PrimaryButton'
import GuestLayout from '@/Layouts/GuestLayout'

import { PageProps, User } from '@/types'
import { Head, Link } from '@inertiajs/react'

export default function About({ auth }: PageProps<{ auth: { user: User } }>): JSX.Element {
  return (
    <GuestLayout>
      <Head title="About" />
      <blockquote className="relative">
        <Quote className="absolute -start-4 -top-4 size-16 text-gray-100" />
        <div className="relative z-10">
          <p className="text-justify text-sm">
            <em>
              Non-Violable Liberty Layers or NVLL &#40;
              <a className="anchor-text" href="https://ipa-reader.com/?text=n%CA%8Cl" target="_blank" rel="noopener noreferrer nofollow">
                /nʌl/
              </a>
              , pronounced nahl or spelled out as N-V-L-L&#41; is a privacy-oriented public service that emphasizes total anonymity. Perfect balance
              between privacy and protection that transcends the boundaries of liberty and counter-surveillance.
            </em>
          </p>
          <br />
          <p className="text-justify text-sm">
            <em>
              Operated by an individual and intended for public use, NVLL is designed with user security and privacy in mind. Please use it
              responsibly; misuse may result in consequences.
            </em>
          </p>
        </div>
        <footer className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <img className="size-10 rounded-full" src="/assets/images/jpg/avatar_default_0-20230707-0001.jpg" alt="Avatar" />
            </div>
            <div className="ms-2">
              <div className="text-base font-semibold text-gray-800">Rivane Rasetiansyah</div>
              <div className="text-xs text-gray-500">JavaScript Developer</div>
            </div>
          </div>
          {auth.user ? (
            <Link href={route('dashboard.create')}>
              <PrimaryButton>Dashboard</PrimaryButton>
            </Link>
          ) : (
            <Link href={route('sign-up.create')}>
              <PrimaryButton>Get Started</PrimaryButton>
            </Link>
          )}
        </footer>
      </blockquote>
    </GuestLayout>
  )
}

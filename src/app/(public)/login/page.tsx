import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth, signIn } from '@/auth'
import Input from '@/components/Input'

export const metadata: Metadata = {
  title: 'Login',
}

export default async function Login() {
  const session = await auth()
  if (session && session.user) redirect('/')

  return (
    <div className="relative pb-56 pt-28">
      <video
        src="login.mp4"
        className="absolute left-0 top-0 z-10 h-full w-full"
        autoPlay
        loop
        muted
      />
      <h1 className="relative z-20 mb-16 text-center text-3xl font-bold uppercase">
        Login for CryptoScout
      </h1>
      <form
        action={async (formData: any) => {
          'use server'
          await signIn('credentials', formData)
          redirect('/')
        }}
        className="relative z-20 mx-auto flex max-w-[400px] flex-col gap-8 rounded-2xl border border-gray-700 bg-gray-900 px-12 py-8 shadow-md"
      >
        <Input
          label="Username"
          type="text"
          name="username"
          id="username"
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          id="password"
          required
        />

        <button className="block w-full rounded-md bg-purple-700 py-2 font-medium text-white">
          Login
        </button>

        <p className="">
          Don't have an account?{' '}
          <Link href="/signup" className="underline underline-offset-4">
            Sign up here
          </Link>
          .
        </p>
      </form>
    </div>
  )
}

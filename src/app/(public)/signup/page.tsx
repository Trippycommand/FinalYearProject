import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { auth, signIn } from '@/auth'
import Input from '@/components/Input'
import { createDoc } from '@/mongodb'
import { saltAndHashPassword } from '@/utils/saltAndHashPassword'

export const metadata: Metadata = {
  title: 'Signup',
}

export default async function Signup() {
  const session = await auth()
  if (session && session.user) redirect('/')

  return (
    <main className="relative pb-48 pt-24">
      <video
        src="signup.mp4"
        className="absolute left-0 top-0 z-10 h-full w-full"
        autoPlay
        loop
        muted
      />
      <h1 className="relative z-20 mb-16 text-center text-3xl font-bold uppercase">
        Sign Up for CryptoScout
      </h1>

      <form
        action={async (formData) => {
          'use server'

          const docData: any = {}
          formData.forEach((value: any, key: any) => {
            docData[key] = value
          })
          docData['password'] = await saltAndHashPassword(docData['password'])

          await createDoc({ collection: 'users', docData })
          redirect('/login')
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
        <Input
          label="Email"
          type="email"
          placeholder="john.doe@gmail.com"
          name="email"
          id="email"
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          name="phonenumber"
          pattern="[0-9]{10}"
          title="Please enter a 10-digit phone number"
          placeholder="123-45-678"
          required
        />

        <button className="block w-full rounded-md bg-purple-700 py-2 font-medium text-white">
          Signup
        </button>
      </form>
    </main>
  )
}

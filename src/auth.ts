import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { object, string } from 'zod'

import { getDoc } from './mongodb'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const { username, password } =
          await signInSchema.parseAsync(credentials)
        if (!credentials) throw new Error('No credentials')

        const user = (await getDoc({
          collection: 'users',
          filter: { username },
          options: {},
        })) as any
        if (!user) throw new Error('No user found')

        const result = await bcrypt.compare(password, user.password)
        if (!result) throw new Error('Incorrect Password or UserID')

        return user
      },
    }),
  ],
})

export const signInSchema = object({
  username: string({ required_error: 'Username is required' }).min(
    1,
    'Email is required',
  ),
  password: string({ required_error: 'Password is required' }).min(
    1,
    'Password is required',
  ),
})

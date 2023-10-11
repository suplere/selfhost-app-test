'use client'

import Input from '@components/input'
import SubmitButton from '@components/submit-button'
import { nhost } from '@utils/nhost-clientSide'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'

const NHOST_SESSION_KEY = 'nhostSession'

export default function SignUpWebAuthn() {
  const router = useRouter()

  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()

    const { session, error } = await nhost.auth.signUp({
      email,
      securityKey: true
    })

    if (error) {
      setError(error.message)
    }

    console.log({
      handleSignUpSession: session
    })

    if (session) {
      Cookies.set(NHOST_SESSION_KEY, btoa(JSON.stringify(session)), { sameSite: 'strict' })
      router.push('/protected/todos')
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-center">Sign Up with a security key</h1>

      {error && <p className="mt-3 font-semibold text-center text-red-500">{error}</p>}

      <form className="w-full max-w-lg space-y-5" onSubmit={handleSignUp}>
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <SubmitButton type="submit" className="w-full">
          Sign Up
        </SubmitButton>
      </form>
    </div>
  )
}

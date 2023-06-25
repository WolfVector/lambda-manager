"use client"
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export function LoginComponent() {
  async function handleSignIn() {
    await signIn("azure-ad", { callbackUrl: '/login' })
  }

  async function handleSignOut() {
    await signOut()
  }

  return (
    <div className="mt-5 height-login flex flex-col justify-center">
      <div className='w-full flex justify-center'>
        <button onClick={handleSignIn} className='border bg-slate-100 rounded-md p-3 w-1/4 flex justify-center gap-x-1'>
          <Image
            src="/img/azure.svg"
            width={30}
            height={30}
            alt='Azure Icon'
          />
          <span className='self-center'>Login</span>
        </button>
      </div>
    </div>
  )
}
"use client"

import { FormEvent } from 'react'
import Image from 'next/image';
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'

const SignupPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [fullName, setFullName] = React.useState('')
  const router = useRouter()

  const handleForm = async (event: FormEvent) => {
    event.preventDefault()

    const { result, error } = await signUp(email, password,fullName);

    if (error) {
      return console.log(error)
    }

    // else successful
    console.log(result)
    return router.push("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="bg-brand-tan p-8 rounded shadow-md">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <h1 className="text-2xl font-semibold mb-6">Editor AI</h1>
        <form onSubmit={handleForm}>
          <div className="mb-4">
            <input
              className="w-full border p-2 rounded"
              type="text"
              placeholder='Full Name'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full border p-2 rounded"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full border p-2 rounded"
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-brand-red text-white px-4 py-2 rounded hover:bg-blue-600"
            type="submit"
            //onClick={handleLogin}
          >
            Sign up
          </button>
        </form>
        <h1 className="text-center mt-4">Already have an account? <a href="/pages/login" className="text-brand-red">Login</a></h1>
      </div>
    </div>
  );
};

export default SignupPage;

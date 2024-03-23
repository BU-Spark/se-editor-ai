"use client"

import { FormEvent } from 'react'
import Image from 'next/image';
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loginError, setLoginError] = React.useState('')
  const router = useRouter()

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      setLoginError('Login failed. Please check your credentials.');
      return;
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="bg-brand-tan p-8 rounded shadow-md">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <h1 className="text-2xl font-semibold mb-6">Editor AI</h1>
        {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
        <form onSubmit={handleForm}>
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
          >
            Login
          </button>
        </form>
        <h1 className="text-center mt-4">Dont have an account? <a href="../pages/signup" className="text-brand-red">Sign up</a></h1>
      </div>
    </div>
  );
};

export default LoginPage;

"use client"

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { FormEvent, useState } from 'react';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [signupFailed, setSignupFailed] = useState(false); // State variable for signup status
  const router = useRouter();

  const { signUp  } = useAuth();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await signUp(email, password,fullName);
      if (res==true) {
        setSignupFailed(false); // Set signup status to successful
        router.push('/admin');
      }
      else {
        setSignupFailed(true); // Set signup status to failed
      }
    } catch (error) {
      console.error('Failed to sign up:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="bg-brand-tan p-8 rounded-lg shadow-md flex flex-col items-center" style={{width: '532px', 
      height: '640px', borderRadius: '9px 0px 0px 0px'}}>
        <div className="flex justify-center w-full">
        <Image src="/editorai.svg" alt="Logo" width={100} height={100} /></div>
        <h1 className="text-2xl text-center mb-6 font-newsreader font-bold"  style={{
          //position: 'absolute', 
          top: '283px', left: '540px', width: '210px', fontSize: '48px', lineHeight: '48px', color: '#31302F', fontWeight: '700', border: '0.69x solid #31302F'}}>Editor AI</h1>
        <form onSubmit={handleForm} className="w-full flex flex-col bg-brand-tan items-center">
          <div className="mb-4">
          {signupFailed && <p className="text-red-500 mb-4">{"Signup failed please try again"}</p>}
          <div style={{ height: '0.69px', background: 'rgba(49, 48, 47, 1)', width: '100%', position: 'relative', top: '50px' }}></div>
            <input
              className="w-full border p-2 pl-3 placeholder-color custom-border-opacity" style={{ 
                width: '341px', 
                height: '42px',
                top: '413px',
                left: '475px',
                borderRadius: '10px',
                fontFamily: 'Poppins',              
                fontSize: '20px',
                lineHeight: '30px',
                color: 'login-text'}}
              type="text"
              placeholder='Full Name'
              //className='pl-3 placeholder-color custom-border-opacity' 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
          <div style={{ height: '0.69px', background: 'rgba(49, 48, 47, 1)', width: '100%', position: 'relative', top: '50px' }}></div>
            <input
              className="w-full border p-2 pl-3 placeholder-color custom-border-opacity" style={{ 
                width: '341px', 
                height: '42px',
                top: '413px',
                left: '475px',
                borderRadius: '10px',
                fontFamily: 'Poppins',              
                fontSize: '20px',
                lineHeight: '30px',
                color: 'login-text'}}
              type="email"
              value={email}
              placeholder="Email"
              //className='pl-3 placeholder-color custom-border-opacity' 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
          <div style={{ height: '0.69px', background: 'rgba(49, 48, 47, 1)', width: '100%', position: 'relative', top: '50px' }}></div>
            <input
              className="w-full border p-2 pl-3 placeholder-color custom-border-opacity" style={{ 
                width: '341px', 
                height: '42px',
                top: '413px',
                left: '475px',
                borderRadius: '10px',
                fontFamily: 'Poppins',              
                fontSize: '20px',
                lineHeight: '30px',
                color: 'login-text'}}
              type="password"
              placeholder='Password'
              //className='pl-3 placeholder-color custom-border-opacity' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-main-color text-white px-4 py-2 hover:bg-red-800 items-center"   style={{
              width: '252px',
              height: '54px',
              fontFamily: 'poppins', // Corrected from 'font'
              fontSize: '22px',
              //lineHeight: '33px',
              background: 'radial-gradient(50% 50% at 50% 50%, #9F4949 0%, #801212 100%)',
              borderRadius: '12px'}}
            type="submit"
            //onClick={handleLogin}
          >
            Sign up
          </button>
        </form>
        <h1 className="text-center mt-4 normal-font" style={{fontFamily:'poppins', fontWeight: 'light'}}>Already have an account? <a href="/pages/login" className="text-main-color bold-weight underline" style={{fontWeight: 'bold'}}>Log In</a></h1>
      </div>
    </div>
  );
};

export default SignupPage;
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { getAuth, signOut } from "firebase/auth";

const Navigation: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const auth = getAuth();

  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      router.push("/pages/login");
    }).catch((error) => {
      console.log(error);
    });
  };

  const isActive = (pathname: string) => (router as any).pathname === pathname;

  return (
    <nav className="list-none text-right ml-auto">
      {user ? (
        <div className="flex items-center">
          <ul className="hidden sm:flex list-none">
            {[
              { href: "/pages/homepage", label: "Home" },
              { href: "/pages/profile", label: "My Profile" }
            ].map(link => (
              <li key={link.href} className="inline-block">
                <Link href={link.href} legacyBehavior={true}>
                  <a className={`block px-3 py-2 hover:text-red-800 ${isActive(link.href) ? 'text-red-500 border-t-2 border-red-500' : ''}`}>
                    {link.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={handleSignOut} className="text-red bg-brand-tan px-3 py-2 rounded-full hover:bg-red-800 hover:text-white ml-2">
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/pages/login" className="font-medium hover:text-brand-red px-2">
            Login
          </Link>
          <Link href="/pages/signup" className="font-medium hover:text-brand-red px-2">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, updatePassword} from 'firebase/auth';
import { cookies } from 'node_modules/next/headers';

interface AuthContextProps {
  user: User | null;
  userId: string | null; //temp
  signUp: (email: string, password: string, displayName: string) => Promise<any>;
  signIn: (email: string, password: string) => Object;
  signOut: () => Promise<void>;
  updateUser: (newDisplayName: string, newPassword: string) => void;
  displayName: string;
  id: string;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });
  //   return () => unsubscribe();
  // }, []);


  // Function to update the user's display name
  async function updateUserDisplayName(user:User, displayName:string) {
    try {
      await updateProfile(user, {
        displayName: displayName
      });
      console.log('Display name updated successfully');
    } catch (error) {
      console.error('Error updating display name:', error);
    }
  }
  
  // Function to update the user's password
  async function updateUserPassword(user:User, newPassword:string) {
    try {
      await updatePassword(user, newPassword);
      console.log('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  }

  const updateUser = (newDisplayName:string,newPassword:string) => {
    const user = auth.currentUser;
    if (user) {
      updateUserDisplayName(user, newDisplayName);
      updateUserPassword(user, newPassword);
    }
  }

  const signUp = async (email: string, password: string, displayName:string) => {
    // try {
    //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //     const user = userCredential.user;

    //     await updateProfile(user, {
    //       displayName: displayName
    //     });

    //     console.log("Sign up successful:", user);
    //     return true;
    // } catch (error) {
    //     // Handle sign up error
    //     console.error("Sign up error:", error);
    //     return false;
    // }
    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, displayName }),
      });
  
      if (!response.ok) {
          console.log("failed to sign up")
          // return response;
          return false;
      }
      console.log("success")
      return true;
      // redirect("/pages/login");
      // return {"success": true};
  } catch (error) {
      return false;
  }
  
};

const signIn = async (email: string, password: string) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        return false;
    }
    console.log(response);
    const data = await response.json();
    setUserId(data.uid);
    cookies().set("accessToken", data.access_token);
    return true;
} catch (error) {
  console.log(error)
    return false;
}
};

  const signOut = () => {
    return auth.signOut();
  };

  const value: AuthContextProps = {
    user,
    userId,
    signUp,
    signIn,
    signOut,
    updateUser,
    displayName: user?.displayName || '',
    id: user?.uid || ''
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

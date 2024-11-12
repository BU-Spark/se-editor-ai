'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, updatePassword} from 'firebase/auth';
interface AuthContextProps {
  user: User | null;
  signUp: (email: string, password: string, displayName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateUser: (newDisplayName: string, newPassword: string) => void;
  displayName: string;
  id: string;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);


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
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: displayName
        });

        console.log("Sign up successful:", user);
        return true;
    } catch (error) {
        // Handle sign up error
        console.error("Sign up error:", error);
        return false;
    }
    
};

const signIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Handle successful sign in
        console.log("Sign in successful:", userCredential.user);
        return userCredential;
    } catch (error) {
        // Handle sign in error
        console.error("Sign in error:", error);
        return false;
    }
};

  const signOut = () => {
    return auth.signOut();
  };

  const value: AuthContextProps = {
    user,
    signUp,
    signIn,
    signOut,
    updateUser,
    displayName: user?.displayName || '',
    id: user?.uid || ''
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

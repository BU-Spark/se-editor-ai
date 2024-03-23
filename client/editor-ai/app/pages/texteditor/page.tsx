"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import TextEditor from './TextEditor';


const texteditpage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/pages/login"); // Redirect to login page if user is not authenticated
    }
  }, [user]);

  const priorityProjects = [{ name: 'Project 1' }, { name: 'Project 2' }];
  const recentProjects = [{ name: 'Project 3' }, { name: 'Project 4' }];

  return (
    <div className = "homepage"> 
        <TextEditor />
    </div>
  );
};

export default texteditpage;
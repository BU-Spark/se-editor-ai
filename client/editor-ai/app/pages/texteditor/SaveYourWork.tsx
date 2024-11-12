'use client';

import React from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

type modalTypes = {
    open: boolean;
    onClose: ()=> void;
    children: React.ReactNode;
};
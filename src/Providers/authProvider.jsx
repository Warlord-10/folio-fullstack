"use client"

import { useEffect } from 'react';
import useAuthStore from '@/Stores/authStore';

export default function AuthProvider({ children }) {
  // const refresh = useAuthStore((s) => s.refresh);

  // useEffect(() => {
  //     refresh().catch(console.error);
  // }, [refresh]);

  return children;  // no extra DOM output
}

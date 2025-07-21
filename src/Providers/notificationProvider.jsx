'use client';
import { useEffect } from 'react';
import useNotificationStore from '@/Stores/notificationStore';
import { initSSE } from '@/Networking/SSEClient';
import useAuthStore from '@/Stores/authStore';

export default function NotificationProvider({ children }) {
  const addNotification = useNotificationStore((s) => s.addNotification);
  const userData = (useAuthStore((state) => state.userData));
  const userId = userData?._id;

  useEffect(() => {
      if(!userId) return;
      console.log("started listening", userId)
      const stop = initSSE((notif) => addNotification(notif), userId);   // start listening
      return stop;
  }, [addNotification, userId]);

  return children;                           
}

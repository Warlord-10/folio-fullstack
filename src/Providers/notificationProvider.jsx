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
      // Build logs arrive as envelopes { type: 'log'|'done'|'error', ... }.
      // Ignore the connection greeting string and anything without a type.
      const stop = initSSE((notif) => { if (notif && notif.type) addNotification(notif) }, userId);
      return stop;
  }, [addNotification, userId]);

  return children;                           
}

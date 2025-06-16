import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useAuthStore } from '../hooks/useAuthStore';
import { useRouter, useSegments } from 'expo-router';

export default function RootLayout() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Mark component as mounted
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only run navigation logic after component is mounted
    if (!mounted) return;
    
    const inAuthGroup = segments[0] === '(auth)';
    
    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to the login page if not authenticated
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to the home page if authenticated
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, mounted]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="comments/[id]" options={{ title: 'Comments' }} />
      <Stack.Screen name="edit-profile" options={{ title: 'Edit Profile' }} />
      <Stack.Screen name="create-post" options={{ title: 'New Post' }} />
    </Stack>
  );
}
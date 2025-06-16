import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../hooks/useAuthStore';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Colors from '../../constants/colors';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { signup, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !fullName || !username || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setError('');
    const success = await signup(email, username, fullName, password);
    
    if (!success) {
      setError('Email or username already exists');
    }
  };

  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Jane Pretty</Text>
        </View>
        
        <Text style={styles.subtitle}>
          Sign up to see photos and videos from your friends.
        </Text>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
        />
        
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
          autoCapitalize="words"
          style={styles.input}
        />
        
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          style={styles.input}
        />
        
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        
        <Button
          title="Sign Up"
          onPress={handleSignup}
          isLoading={isLoading}
          fullWidth
          style={styles.signupButton}
        />
        
        <Text style={styles.termsText}>
          By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 40,
    fontFamily: 'System',
    fontWeight: '500',
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.light.placeholder,
    marginBottom: 20,
    fontSize: 16,
  },
  input: {
    marginBottom: 12,
  },
  signupButton: {
    marginTop: 10,
  },
  termsText: {
    textAlign: 'center',
    color: Colors.light.placeholder,
    fontSize: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  footerText: {
    color: Colors.light.text,
    fontSize: 14,
  },
  loginText: {
    color: Colors.light.tint,
    fontWeight: '600',
    fontSize: 14,
  },
  errorText: {
    color: Colors.light.red,
    textAlign: 'center',
    marginBottom: 16,
  },
});
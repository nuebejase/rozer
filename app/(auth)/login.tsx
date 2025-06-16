import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../hooks/useAuthStore';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Colors from '../../constants/colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setError('');
    const success = await login(email, password);
    
    if (!success) {
      setError('Invalid email or password');
    }
  };

  // For demo purposes, let's add a quick login function
  const handleQuickLogin = async () => {
    setEmail('jane@example.com');
    setPassword('password');
    await login('jane@example.com', 'password');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Jane Pretty</Text>
      </View>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
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
        title="Log In"
        onPress={handleLogin}
        isLoading={isLoading}
        fullWidth
        style={styles.loginButton}
      />
      
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>
      
      <Button
        title="Quick Login (Demo)"
        onPress={handleQuickLogin}
        variant="secondary"
        fullWidth
        style={styles.demoButton}
      />
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 40,
    fontFamily: 'System',
    fontWeight: '500',
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 10,
  },
  forgotPassword: {
    color: Colors.light.link,
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.border,
  },
  dividerText: {
    marginHorizontal: 10,
    color: Colors.light.placeholder,
    fontSize: 14,
  },
  demoButton: {
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: Colors.light.text,
    fontSize: 14,
  },
  signupText: {
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
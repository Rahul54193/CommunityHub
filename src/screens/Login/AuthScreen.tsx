import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useAuthStore } from '../../state/store/authStore';
import { styles } from './AuthScreen.styles';

interface LoginFormState {
  email: string;
  password: string;
  isLoading: boolean;
}

export const AuthScreen: React.FC = () => {
  const { login } = useAuthStore();
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    isLoading: false,
  });

  const handleEmailChange = (email: string) => {
    setFormState(prev => ({ ...prev, email }));
  };

  const handlePasswordChange = (password: string) => {
    setFormState(prev => ({ ...prev, password }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    const { email, password } = formState;

    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return;
    }

    setFormState(prev => ({ ...prev, isLoading: true }));

    try {
      await login(email, password);
    } catch (error) {
      Alert.alert(
        'Login Failed',
        'Please check your credentials and try again',
      );
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Community Hub</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!formState.isLoading}
            value={formState.email}
            onChangeText={handleEmailChange}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            editable={!formState.isLoading}
            value={formState.password}
            onChangeText={handlePasswordChange}
          />

          <TouchableOpacity
            style={[
              styles.loginButton,
              formState.isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={formState.isLoading}
          >
            {formState.isLoading ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>
          <View style={styles.demoContainer}>
            <Text style={styles.demoText}>Demo Credentials:</Text>
            <Text style={styles.demoEmail}>user@example.com</Text>
            <Text style={styles.demoPassword}>12345</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

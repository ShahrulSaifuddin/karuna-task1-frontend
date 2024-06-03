import React, { useState } from 'react';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { handleLogin } from '../api/auth/auth';
import CustomTextInput from '../components/Custom/CustomTextInput';
import CustomButton from '../components/Custom/CustomButton';
import login from '../assets/login.png';

export default function LoginScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    if (!userName || !password) {
      Alert.alert('Error', 'Username and password are required.');
      return;
    }
    await handleLogin({ userName, password, navigation });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.loginContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Image source={login} style={styles.image} />
        <View style={styles.formContainer}>
          <CustomTextInput
            placeholder="Enter your username"
            value={userName}
            onChangeText={setUserName}
          />
          <CustomTextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <CustomButton title="Login" onPress={onLogin} style={styles.button} />
          <Text style={styles.accountText}>
            Don't have an account?{' '}
            <Text
              style={styles.signin}
              onPress={() => navigation.navigate('Register')}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flexGrow: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 16,
    alignSelf: 'center',
  },
  formContainer: {
    width: '100%',
  },
  button: {
    marginTop: 30,
  },
  accountText: {
    marginTop: 30,
    textAlign: 'center',
  },
  signin: {
    color: '#3ABEF9',
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import CustomTextInput from '../components/Custom/CustomTextInput';
import CustomButton from '../components/Custom/CustomButton';
import { register } from '../api/auth/auth';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  // const [formError, setFormError] = useState('');

  const handleRegister = async () => {
    // if (!firstName || !lastName || !userName) {
    //   setFormError('First name, last name, and username cannot be empty');
    //   Alert.alert()
    // }
    try {
      const response = await register({
        firstName,
        lastName,
        userName,
        email,
        password,
        navigation,
      });
      if (response) {
        Alert.alert('Success', 'User registered successfully');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Error', 'Failed to register user');
    }
  };

  const validateEmail = (inputEmail) => {
    const emailRegex = /\S+@\S+\.\S+/;
    setIsValidEmail(emailRegex.test(inputEmail));
  };

  const validatePassword = (inputPassword) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValidPassword(passwordRegex.test(inputPassword));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome Onboard</Text>
        <Text style={styles.text}>Let's help you meet up your tasks</Text>
        <CustomTextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        {!firstName.trim() && (
          <Text style={styles.errorText}>This field is required</Text>
        )}
        <CustomTextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        {!lastName.trim() && (
          <Text style={styles.errorText}>This field is required</Text>
        )}
        <CustomTextInput
          placeholder="Username"
          value={userName}
          onChangeText={setUserName}
        />
        {!userName.trim() && (
          <Text style={styles.errorText}>This field is required</Text>
        )}
        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
        />
        {!isValidEmail && (
          <Text style={styles.errorText}>Please enter a valid email</Text>
        )}
        <CustomTextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
          }}
          secureTextEntry
        />
        {!isValidPassword && (
          <Text style={styles.errorText}>
            Password must contain at least one uppercase letter, one lowercase
            letter, one numeric digit, and one special character
          </Text>
        )}
        <CustomButton
          title="Register"
          onPress={handleRegister}
          style={styles.button}
          disabled={
            !firstName.trim() ||
            !lastName.trim() ||
            !userName.trim() ||
            !isValidEmail ||
            !isValidPassword
          }
        />
        <Text style={styles.accountText}>
          Already have an account?{' '}
          <Text
            style={styles.signin}
            onPress={() => navigation.navigate('Login')}
          >
            sign in
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginBottom: 18,
    textAlign: 'center',
    color: 'grey',
    fontWeight: '900',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 15,
    // textAlign: 'center',
  },
});

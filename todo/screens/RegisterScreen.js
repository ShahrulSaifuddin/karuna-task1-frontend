import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomTextInput from '../components/Custom/CustomTextInput';
import CustomButton from '../components/Custom/CustomButton';
import { register } from '../api/auth/auth';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Onboard</Text>
      <Text style={styles.text}>Let's help you meet up your tasks</Text>
      <CustomTextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <CustomTextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <CustomTextInput
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
      />
      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton
        title="Register"
        onPress={handleRegister}
        style={styles.button}
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
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

import { useState } from 'react';
import { View, Alert, Text, StyleSheet, Image } from 'react-native';
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
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Welcome Back !</Text>
      <Image source={login} style={styles.image} />
      <View style={{ flex: 2 }}>
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
          Already have an account?{' '}
          <Text
            style={styles.signin}
            onPress={() => navigation.navigate('Register')}
          >
            sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    flex: 2,
    marginBottom: 16,
    alignSelf: 'center',
    objectFit: 'contain',
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

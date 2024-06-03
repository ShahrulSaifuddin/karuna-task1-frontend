import customFetch from '../../utils/customFetch';
import { Alert } from 'react-native';

export const handleLogin = async ({ userName, password, navigation }) => {
  try {
    const response = await customFetch.post('/auth/login', {
      userName,
      password,
    });

    console.log('RESPONSE', response.data.msg);
    if (response.data.msg === 'user logged in') {
      navigation.navigate('Todo');
    } else {
      Alert.alert(response.data.error || 'Login failed. Please try again.');
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      Alert.alert('Error', 'Invalid username or password. Please try again.');
    } else if (err.code === 'ECONNABORTED') {
      Alert.alert('Error', 'Login request timed out. Please try again.');
    } else {
      console.error('Login error:', err);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  }
};

export const register = async ({
  firstName,
  lastName,
  userName,
  email,
  password,
}) => {
  try {
    const response = await customFetch.post('/auth/register', {
      firstName,
      lastName,
      userName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

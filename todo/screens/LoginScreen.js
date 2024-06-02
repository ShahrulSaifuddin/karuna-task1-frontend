import { useState } from 'react';
import { View, Alert } from 'react-native';
import { handleLogin } from '../api/auth/auth';
import CustomTextInput from '../components/Custom/CustomTextInput';
import CustomButton from '../components/Custom/CustomButton';

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
    <View>
      <CustomTextInput
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
      />
      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton title="Login" onPress={onLogin} />
    </View>
  );
}

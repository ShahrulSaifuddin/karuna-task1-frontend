import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoScreen from './screens/TodoScreen';
import LoginScreen from './screens/LoginScreen';
import EditTodo from './screens/EditTodo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  useReactQueryDevTools(queryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Todo" component={TodoScreen} />
          <Stack.Screen name="EditTodo" component={EditTodo} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

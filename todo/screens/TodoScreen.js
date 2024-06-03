// #region Imports
import React, { useState, useEffect } from 'react'; // Added useEffect import
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import TodoItem from '../components/TODO/TodoItem';
import TodoInput from '../components/TODO/TodoInput';
import { fetchCurrentUser } from '../api/user/users';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CustomButton from '../components/Custom/CustomButton';
import { createTodo, fetchAllTodos } from '../api/todo/todo';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import customFetch from '../utils/customFetch';
// #endregion

const TodoScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [enteredTodoText, setEnteredTodoText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  // #region Query Logic
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
    onError: (error) => {
      if (error.response.status === 401) {
        navigation.navigate('Login');
      }
    },
  });

  const {
    data: todoData,
    isLoading: isTodoLoading,
    error: todoError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchAllTodos,
    enabled: !!userData,
  });

  const addTodo = useMutation({
    mutationFn: createTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(['todos']); // Cancel queries related to 'todos'
      const previousTodos = queryClient.getQueryData(['todos']); // Get previous todos from cache
      queryClient.setQueryData(['todos'], (old) => [...old, newTodo]); // Update todos optimistically
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['todos'], context.previousTodos); // Rollback changes on error
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']); // Invalidate 'todos' query to refetch data
    },
  });
  // #endregion

  // #region Event Handler
  const inputHandler = (enteredText) => {
    setEnteredTodoText(enteredText);
  };

  const addTodoHandler = async () => {
    await addTodo.mutateAsync(enteredTodoText);
    setEnteredTodoText('');
    setIsModalVisible(false);
  };

  const closeModalHandler = () => {
    setIsModalVisible(false);
  };

  const logoutHandler = async () => {
    try {
      const response = await customFetch.get('/auth/logout');
      console.log('response', response.data.msg);
      console.log('User logged out');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  // #endregion

  useEffect(() => {
    const currentDate = new Date().toDateString();
    setCurrentDate(currentDate);
  }, []);

  if (isUserLoading) {
    return <ActivityIndicator />;
  }

  if (userError) {
    return <Text>{userError.message}</Text>;
  }

  if (todoError) {
    return <Text>{todoError.message}</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
        {userData?.image ? (
          <Image
            source={{ uri: userData.image }}
            style={styles.userImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.iconContainer}>
            <MaterialIcons name="person" size={50} color="black" />
          </View>
        )}
        <Text style={styles.headerText}>
          Welcome {userData?.firstName} {userData?.lastName}
        </Text>
      </View>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Todo</Text>
          <MaterialIcons
            name="close"
            size={24}
            color="#333"
            onPress={closeModalHandler}
            style={styles.closeIcon}
          />
          <TodoInput
            inputValue={enteredTodoText}
            inputHandler={inputHandler}
            addTodoHandler={addTodoHandler}
          />
        </View>
      </Modal>
      {isTodoLoading ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={styles.loadingIndicator}
        />
      ) : (
        <View style={styles.todosContainer}>
          <Text style={styles.currentDate}>{currentDate}</Text>
          <FlatList
            data={todoData}
            renderItem={({ item }) => <TodoItem {...item} />}
            keyExtractor={(item) => item._id}
            alwaysBounceVertical={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="+"
          onPress={() => setIsModalVisible(true)}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default TodoScreen;

// #region Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: '#A7E6FF',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  currentDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  todosContainer: {
    flex: 7,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loadingIndicator: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 40,
  },
  headerText: {
    textTransform: 'capitalize',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
});
// #endregion

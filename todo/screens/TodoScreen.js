import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import TodoItem from '../components/TODO/TodoItem';
import TodoInput from '../components/TODO/TodoInput';
import { fetchCurrentUser } from '../api/user/users';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CustomButton from '../components/Custom/CustomButton';
import customFetch from '../utils/customFetch';
import { createTodo, fetchAllTodos } from '../api/todo/todo';

const TodoScreen = () => {
  const queryClient = useQueryClient();
  const [enteredTodoText, setEnteredTodoText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
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

  const inputHandler = (enteredText) => {
    setEnteredTodoText(enteredText);
  };

  const addTodoHandler = async () => {
    await addTodo.mutateAsync(enteredTodoText); // Call addTodo mutation with enteredTodoText
    setIsModalVisible(false);
  };

  const closeModalHandler = () => {
    setIsModalVisible(false);
  };

  if (isUserLoading) {
    return <ActivityIndicator />;
  }

  if (userError) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>Welcome {userData?.userName}</Text>
      </View>
      <Modal visible={isModalVisible} animationType="slide">
        <TodoInput
          inputHandler={inputHandler}
          addTodoHandler={addTodoHandler}
          closeModalHandler={closeModalHandler}
        />
      </Modal>
      <View style={styles.todosContainer}>
        <FlatList
          data={todoData}
          renderItem={({ item }) => <TodoItem {...item} />}
          keyExtractor={(item) => item._id}
          alwaysBounceVertical={true}
        />
      </View>
      <CustomButton title="Add Todo" onPress={() => setIsModalVisible(true)} />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flex: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  todosContainer: {
    flex: 7,
  },
});

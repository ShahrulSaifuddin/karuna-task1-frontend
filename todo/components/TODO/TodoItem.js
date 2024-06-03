import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { deleteTodo, updateTodo } from '../../api/todo/todo';

const TodoItem = ({ _id, title, completed, onEdit }) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(completed);

  const handleDelete = useMutation({
    mutationFn: () => deleteTodo(_id),
    onMutate: async () => {
      await queryClient.cancelQueries(['todos']);
      const previousTodos = queryClient.getQueryData(['todos']);
      queryClient.setQueryData(['todos'], (old) =>
        old.filter((todo) => todo._id !== _id)
      );
      return { previousTodos };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['todos'], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const handleCheck = useMutation({
    mutationFn: () => updateTodo(_id),
    onMutate: async () => {
      await queryClient.cancelQueries(['todos']);
      const previousTodos = queryClient.getQueryData(['todos']);
      queryClient.setQueryData(['todos'], (old) =>
        old.map((todo) =>
          todo._id === _id ? { ...todo, completed: !isChecked } : todo
        )
      );
      return { previousTodos };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['todos'], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const handleCheckChange = () => {
    setIsChecked(!isChecked);
    handleCheck.mutate();
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete.mutate(),
          style: 'destructive',
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('EditTodo', { _id, currentTitle: title });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCheckChange} style={styles.checkbox}>
        <MaterialIcons
          name={isChecked ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={isChecked ? '#007bff' : '#333333'}
        />
      </TouchableOpacity>
      <View style={styles.textInputContainer}>
        <TextInput
          value={title}
          style={[styles.title, isChecked && styles.completedTitle]}
          editable={!isChecked}
          multiline={true}
          numberOfLines={2}
        />
      </View>
      <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
        <MaterialIcons name="edit" size={24} color="#007bff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={confirmDelete} style={styles.iconButton}>
        <MaterialIcons name="delete" size={24} color="#dc3545" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  checkbox: {
    marginRight: 16,
  },
  textInputContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#333333',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#cccccc',
  },
  iconButton: {
    marginLeft: 16,
  },
});

export default TodoItem;

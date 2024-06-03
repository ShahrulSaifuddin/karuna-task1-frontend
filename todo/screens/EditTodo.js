// #region Imports
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CustomButton from '../components/Custom/CustomButton';
import CustomTextInput from '../components/Custom/CustomTextInput';
import { editTodo } from '../api/todo/todo';
// #endregion

const EditTodo = ({ route, navigation }) => {
  const { _id, currentTitle } = route.params;
  const [title, setTitle] = useState(currentTitle);
  const queryClient = useQueryClient();

  // #region Query Logic
  const handleUpdate = useMutation({
    mutationFn: () => editTodo(_id, title),
    onMutate: async (newTitle) => {
      await queryClient.cancelQueries(['todos']);

      const previousTodos = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old) =>
        old.map((todo) =>
          todo._id === _id ? { ...todo, title: newTitle } : todo
        )
      );
      navigation.goBack();
      return { previousTodos };
    },
    onError: (err, newTitle, context) => {
      queryClient.setQueryData(['todos'], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
  // #endregion

  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="Edit your todo"
        value={title}
        onChangeText={setTitle}
      />
      <CustomButton title="Save" onPress={() => handleUpdate.mutate(title)} />
    </View>
  );
};

export default EditTodo;

// #region Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
});
// #endregion

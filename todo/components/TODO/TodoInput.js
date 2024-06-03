import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import CustomTextInput from '../Custom/CustomTextInput';
import CustomButton from '../Custom/CustomButton';

const TodoInput = ({ inputHandler, addTodoHandler }) => {
  return (
    <View style={styles.inputContainer}>
      <CustomTextInput
        placeholder="Your todo"
        onChangeText={inputHandler}
        style={styles.input}
      />
      <CustomButton
        title="Add Todo"
        onPress={addTodoHandler}
        style={styles.button}
      />
    </View>
  );
};

export default TodoInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  input: {
    flex: 1,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});

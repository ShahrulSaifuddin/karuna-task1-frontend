import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  style,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={[styles.input, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 15,
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
});

export default CustomTextInput;

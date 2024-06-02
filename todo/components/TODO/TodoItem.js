import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TodoItem = ({ title, completed, onEdit, onDelete }) => {
  const [isChecked, setIsChecked] = useState(completed);

  const handleCheckChange = () => {
    setIsChecked(!isChecked);
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
      <TextInput
        value={title}
        style={[styles.title, isChecked && styles.completedTitle]}
        editable={!isChecked}
      />
      <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
        <MaterialIcons name="edit" size={24} color="#007bff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
        <MaterialIcons name="delete" size={24} color="#dc3545" />
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  checkbox: {
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: '#333333',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#cccccc',
  },
  iconButton: {
    marginLeft: 8,
  },
});

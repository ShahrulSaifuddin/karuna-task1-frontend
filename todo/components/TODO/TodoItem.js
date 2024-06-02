import { StyleSheet } from 'react-native';

import { View, Text } from 'react-native';

const TodoItem = ({ title, completed }) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{completed}</Text>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({});

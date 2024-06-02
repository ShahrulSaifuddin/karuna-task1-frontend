import customFetch from '../../utils/customFetch';

export const fetchAllTodos = async () => {
  try {
    const response = await customFetch.get('/todos');
    console.log('TODOS', response.data.todo);
    return response.data.todo;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

export const createTodo = async (title) => {
  try {
    const response = await customFetch.post('/todos', { title: title });
    console.log('TODOS', response);
    return response;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

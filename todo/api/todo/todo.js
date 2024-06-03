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

export const deleteTodo = async (id) => {
  try {
    const response = await customFetch.delete(`/todos/${id}`);
    console.log('TODOS', response);
    return response;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

export const editTodo = async (id, title) => {
  try {
    const response = await customFetch.patch(`/todos/${id}`, { title });
    console.log('TODOS', response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateTodo = async (id) => {
  try {
    const response = await customFetch.patch('/todos', { id });
    console.log('TODOS', response);
    return response;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

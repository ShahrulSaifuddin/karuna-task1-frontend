import customFetch from '../../utils/customFetch';

// #region Fetch All Todos
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
// #endregion

// #region Create Todo
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
// #endregion

// #region Delete Todo
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
// #endregion

// #region Edit Todo Title
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
// #endregion

// #region Update Checked Box Todo
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
// #endregion

import customFetch from '../../utils/customFetch';

export const fetchCurrentUser = async () => {
  try {
    const response = await customFetch.get('/users/current-user');
    return response.data.user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

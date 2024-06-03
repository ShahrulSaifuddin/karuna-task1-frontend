import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://karuna-task1-backend.onrender.com/api/v1',
  timeout: 10000,
});

export default customFetch;

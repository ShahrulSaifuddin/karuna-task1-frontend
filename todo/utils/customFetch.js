import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://172.27.128.1:5000/api/v1',
  timeout: 10000,
});

export default customFetch;

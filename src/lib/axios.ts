import Axios from 'axios';

const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BE_URL}/api`,
  responseType: 'json',

  headers: {
    'Content-Type': 'application/json',
  },
});

export function addTokenToAxios() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;

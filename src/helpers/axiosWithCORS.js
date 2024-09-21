import axios from 'axios';

const axiosWithCORS = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/http://localhost:3000', // replace with your API base URL
});

export default axiosWithCORS;

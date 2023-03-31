import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


const axiosClient = axios.create({
  baseURL: 'https://moa.aveapp.com:21405',
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use((config) => {
  config.headers.genericKey = "someGenericValue";
  return config;
}, (error) => {
  return Promise.reject(error);
});


// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;

   
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;

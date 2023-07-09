import axios from 'axios';
import UserService from '../services/UserService'; // Update this with the path to UserService

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
  if (UserService.isLoggedIn()) {
    const token = await UserService.getToken();
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json'; // Optional: Set the Content-Type header if needed
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;


// import axios from 'axios';
// import UserService from '../services/UserService'; // Update this with the path to UserService

// const axiosInstance = axios.create();

// axiosInstance.interceptors.request.use(async (config) => {
//   if (UserService.isLoggedIn()) {
//     const initialToken = await UserService.getToken();

//     // Token exchange
//     const response = await axios.post('http://localhost:8080/auth/realms/myrealm/protocol/openid-connect/token', 
//       new URLSearchParams({
//         client_id: 'account',
//         grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
//         subject_token: initialToken,
//         subject_issuer: 'http://localhost:8080/auth/realms/myrealm',
//         requested_token_type: 'urn:ietf:params:oauth:token-type:access_token',
//         requested_subject: 'rest'
//       }),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       }
//     );

//     const restToken = response.data.access_token;

//     config.headers['Authorization'] = `Bearer ${restToken}`;
//     config.headers['Content-Type'] = 'application/json'; // Optional: Set the Content-Type header if needed
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// export default axiosInstance;


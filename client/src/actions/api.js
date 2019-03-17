import axios from 'axios';

import config from '../utils/config';
// import store from '../store';

// const headers = {
//   headers: {
//     'Content-type': 'application/json',
//     Authorization: store.getState().auth.user.token,
//   },
// };

// const axios = require('axios').default.create({
//   /*
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false,
//     requestCert: false,
//     agent: false
//   })
//   */
//   headers,
//   timeout: 40000,
// });

// eslint-disable-next-line no-return-await
export const get = async url => await axios.get(`${config.baseUrl}/api/${url}`);

// eslint-disable-next-line no-return-await
export const post = async (url, data) => await axios.post(`${config.baseUrl}/api/${url}`, data);

// eslint-disable-next-line no-return-await
export const put = async (url, data) => await axios.put(`${config.baseUrl}/api/${url}`, data);

// eslint-disable-next-line no-return-await
export const del = async (url) => await axios.delete(`${config.baseUrl}/api/${url}`);

export default get;

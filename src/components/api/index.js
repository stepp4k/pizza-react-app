// https://9cxlt1wgo5.execute-api.us-east-1.amazonaws.com/api
//c46caac1-11bc-4dd3-bd8d-a311ae327a96

import axios from "axios";

const instance = axios.create({
    baseURL: 'https://9cxlt1wgo5.execute-api.us-east-1.amazonaws.com/api/',
    timeout: 5000,
    headers: {'Authorization': 'basic c46caac1-11bc-4dd3-bd8d-a311ae327a96'}
  });

export default instance;
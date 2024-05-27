import axios from 'axios';
// import request from 'request';

const API_ENDPOINT = 'http://localhost:8000/api'
const getEmails = async () => {
  return axios.get(`${API_ENDPOINT}/email`);
}

const sendEmail = async (email) => {
  return axios.post(`${API_ENDPOINT}/email`, email);
}

export {
  getEmails,
  sendEmail
}
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/advice';

export const getAllAdvice = () => {
  return axios.get(`${API_URL}/all`);
};

export const saveAdvice = (adviceDTO) => {
  return axios.post(`${API_URL}/saveAdvice`, adviceDTO);
};

export const deleteAdvice = (id) => {
  return axios.delete(`${API_URL}/delete/${id}`);
};

export const updateAdvice = (id, updatedAdvice) => {
  return axios.put(`${API_URL}/updateAdviceByID/${id}`, updatedAdvice);
};

export const getAdviceById = (id, getAviceById) => {
  return axios.get(`${API_URL}/getAdviceByID/${id}`, getAdviceById);
};

export const getAdviceByBmiStatus = (bmiStatus) => {
  return axios.get(`/getAdviceByStatus/${bmiStatus}`, getAdviceByBmiStatus);
};
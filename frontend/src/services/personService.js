import axios from 'axios';

const API_URL = '/api/persons';

export const getAllPeople = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  return response.data;
};

export const getPerson = async (id) => {
  const response = await axios.get(`${API_URL}/get/${id}`);
  return response.data;
};

export const createPerson = async (personData) => {
  const response = await axios.post(`${API_URL}/register`, personData);
  return response.data;
};

export const updatePerson = async (id, personData) => {
  const response = await axios.put(`${API_URL}/update/${id}`, personData);
  return response.data;
};

export const deletePerson = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};
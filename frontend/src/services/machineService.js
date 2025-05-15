import axios from 'axios';

const API_URL = '/api/machines';

export const getAllMachines = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  return response.data;
};

export const getMachine = async (id) => {
  const response = await axios.get(`${API_URL}/get/${id}`);
  return response.data;
};

export const createMachine = async (machineData) => {
  const response = await axios.post(`${API_URL}/register`, machineData);
  return response.data;
};

export const updateMachine = async (id, machineData) => {
  const response = await axios.put(`${API_URL}/update/${id}`, machineData);
  return response.data;
};

export const deleteMachine = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};
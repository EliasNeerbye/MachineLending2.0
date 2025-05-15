import axios from 'axios';

const API_URL = '/api/lendings';

export const lendMachine = async (lendingData) => {
  const response = await axios.post(`${API_URL}/lend`, lendingData);
  return response.data;
};

export const finishLending = async (id) => {
  const response = await axios.put(`${API_URL}/finish/${id}`);
  return response.data;
};

export const updateLendingStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/status/${id}`, { status });
  return response.data;
};
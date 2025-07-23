import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export const getVideoInfo = async (url) => {
  try {
    const response = await api.post('/video/info', { url });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Network error' };
  }
};

export const downloadVideo = async (url, quality = 'high', format = 'mp4') => {
  try {
    const response = await api.post('/video/download', {
      url,
      quality,
      format,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Network error' };
  }
};

export default api;

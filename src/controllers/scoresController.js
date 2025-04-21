import { getScores, uploadScore, deleteScore } from '../services/scoresService';

const getAuthToken = () => {
  return sessionStorage.getItem('authToken');
};

export const fetchScores = async () => {
  const token = getAuthToken();
  try {
    const scores = await getScores(token);
    return scores;
  } catch (error) {
    console.error("Error fetching scores:", error);
    return [];
  }
};

export const handleUploadScore = async (file, title) => {
  const token = getAuthToken();
  try {
    const uploadedScore = await uploadScore(file, title, token);
    return uploadedScore;
  } catch (error) {
    console.error("Error uploading score:", error);
    throw error;
  }
};

export const handleDeleteScore = async (id) => {
  const token = getAuthToken();
  try {
    await deleteScore(id, token);
  } catch (error) {
    console.error("Error deleting score:", error);
    throw error;
  }
};


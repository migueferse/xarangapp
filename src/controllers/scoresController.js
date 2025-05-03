import scoresService from "../services/scoresService";

const getAuthToken = () => {
  return sessionStorage.getItem('authToken');
};

const fetchScores = async (instrumentId = '') => {
  const token = getAuthToken();
  try {
    const params = instrumentId ? `?instrument_id=${instrumentId}` : '';
    const scores = await scoresService.getScores(token, params);
    return scores;
  } catch (error) {
    console.error("Error fetching scores:", error);
    return [];
  }
};

const handleUploadScore = async (file, title, instrumentId) => {
  const token = getAuthToken();
  try {
    const uploadedScore = await scoresService.uploadScore(file, title, instrumentId, token);
    return uploadedScore;
  } catch (error) {
    console.error("Error uploading score:", error);
    throw error;
  }
};

const handleDeleteScore = async (id) => {
  const token = getAuthToken();
  try {
    await scoresService.deleteScore(id, token);
  } catch (error) {
    console.error("Error deleting score:", error);
    throw error;
  }
};

const getInstruments = async () => {
  const token = getAuthToken();
  return await scoresService.getInstruments(token);
};

export {
  fetchScores,
  getInstruments,
  handleUploadScore,
  handleDeleteScore,
};

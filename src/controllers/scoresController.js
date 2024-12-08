import { getScores } from '../services/scoresService';

export const fetchScores = async () => {
  try {
    const data = await getScores();
    return data;
  } catch (error) {
    console.error('Error fetching scores:', error);
    return [];
  }
};

// services/askQuestionService.ts
import axios from 'axios';
import apiUrl from '../components/config';

export const askQuestionService = async (question: string, documentId: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("query", question);
    formData.append("doc_id", documentId);
    const response = await axios.post(`${apiUrl}/ask_chat`, formData);

    return response.data.response;
  } catch (error) {
    console.error('Error in askQuestionService:', error);
    throw error;
  }
};
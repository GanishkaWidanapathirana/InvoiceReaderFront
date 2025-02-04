import axios from "axios";
import { ApiResponse } from "../types";
import apiUrl from "../components/config"



export const processDocument = async (file: File, userType: string): Promise<ApiResponse> => {
  console.log("File being passed to processDocument:", file);  // Log the file object
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_type", userType);

    const response = await axios.post<ApiResponse>(`${apiUrl}/upload`, formData, {
      headers: {
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error processing document:", error);
    throw new Error("Failed to process the document. Please try again.");
  }
};

  
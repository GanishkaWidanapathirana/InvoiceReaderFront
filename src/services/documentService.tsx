export const processDocument = async (file: File): Promise<string[]> => {
    // Simulate a delay for processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    // Return mock suggestions for now
    return [
      `Suggestion for "${file.name}" - Item 1`,
      `Suggestion for "${file.name}" - Item 2`,
      `Suggestion for "${file.name}" - Item 3`,
    ];
  };
  
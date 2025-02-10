interface WindowConfigs {
    apiUrl?: string;
  }
  
  // Extend the global Window interface
  declare global {
    interface Window {
      configs?: WindowConfigs;
    }
  }
  
  // Use a fallback in case `window.configs` is undefined
  const apiUrl: string = window?.configs?.apiUrl ?? "/";
  //const apiUrl = "http://localhost:8000";

export default apiUrl;
export {};
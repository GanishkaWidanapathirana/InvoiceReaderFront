import React, { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard'; // Assuming this is your main dashboard component
import Cookies from 'js-cookie';
import LoginPrompt from './components/LoginPrompt';

const App: React.FC = () => {
  const encodedUserInfo = Cookies.get('userinfo'); // Get user info from cookies
  const [userInfo, setUserInfo] = useState<Record<string, any> | null>(null); // State to hold user info

  useEffect(() => {
    if (!encodedUserInfo) return; // If no cookie, do nothing

    try {
      // Decode and parse the cookie
      const parsedUserInfo = JSON.parse(atob(encodedUserInfo)) as Record<string, any>;

      if (parsedUserInfo) {
        // Save parsed info to localStorage and update state
        localStorage.setItem('userinfo', JSON.stringify(parsedUserInfo));
        console.log(parsedUserInfo);
        setUserInfo(parsedUserInfo);

        // Remove the cookie after processing
        Cookies.remove('userinfo', { path: '/' });
      }
    } catch (error) {
      console.error('Error decoding or parsing user info:', error); // Log any errors
    }
  }, [encodedUserInfo]);

  const handleLogin = () => {
    // Redirect to the login page
    window.location.href = '/auth/login';
  };

  const handleLogout = async () => {
    try {
      // Read the session hint cookie
      const sessionHint = Cookies.get('session_hint');

      // Clear session data
      Cookies.remove('userinfo', { path: '/' });
      localStorage.clear();

      // Redirect the user to the logout page
      window.location.href = `/auth/logout?session_hint=${sessionHint}`;
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  return (
    <div className="App">
      {!userInfo ? (
        // If no user info, show login prompt
        <LoginPrompt onLogin={handleLogin} />      
      ) : (
        // If user info exists, render the Dashboard
        <Dashboard userInfo={userInfo} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Cookies from 'js-cookie';

const App: React.FC = () => {
  const encodedUserInfo = Cookies.get('userinfo');
  const [userInfo, setUserInfo] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    if (!encodedUserInfo) return;

    try {
      // Decode the cookie and parse it as JSON
      const parsedUserInfo = JSON.parse(atob(encodedUserInfo)) as Record<string, any>;

      if (parsedUserInfo) {
        // Store the parsed user info in localStorage and state
        const info = JSON.stringify(parsedUserInfo);
        localStorage.setItem('userinfo', info);
        setUserInfo(parsedUserInfo);

        // Remove the cookie after processing
        Cookies.remove('userinfo', { path: '/' });
      }
    } catch (error) {
      console.error('Error decoding or parsing user info:', error);
    }
  }, [encodedUserInfo]);

  const handleLogin = () => {
    // Redirect to the login page
    window.location.href = '/auth/login';
  };

  return (
    <div className="App">
      {!userInfo ? (
        <div>
          <h2>Welcome, please log in</h2>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default App;

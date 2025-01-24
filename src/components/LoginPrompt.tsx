import React from 'react';

interface LoginPromptProps {
  onLogin: () => void; // Function type for the login handler
}

const LoginPrompt: React.FC<LoginPromptProps> = ({ onLogin }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Access Your Account</h2>
        <p style={styles.text}>Please log in to continue.</p>
        <button
          style={styles.button}
          onClick={onLogin}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#004080')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#001529')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#001529', // Dark blue background
  },
  card: {
    backgroundColor: '#fff', // White card background
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
  },
  heading: {
    fontSize: '1.5rem',
    color: '#001529', // Dark blue heading
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1rem',
    color: '#333', // Subtle text color
    marginBottom: '1.5rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#001529', // Dark blue button
    color: '#fff', // White text
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
};

export default LoginPrompt;

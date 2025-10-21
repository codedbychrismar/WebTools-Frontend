import  { useState, useEffect } from 'react';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/userPage';

const App = () => {
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'F12') {
        e.preventDefault(); 
        setIsAdminView(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      {isAdminView ? (
        <AdminPage />
      ) : (
        <UserPage />
      )}
    </div>
  );
};



export default App;
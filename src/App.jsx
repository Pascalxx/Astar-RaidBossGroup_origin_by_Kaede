import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ZakumGuide from './components/Zakum/ZakumGuide';
import HomePage from './components/Home/HomePage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'zakum'

  // 根據系統偏好或預設值初始化主題
  useEffect(() => {
    // 這裡可以檢查 localStorage 或系統偏好
    document.documentElement.setAttribute('data-bs-theme', 'light');
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.setAttribute('data-bs-theme', newMode ? 'dark' : 'light');
  };

  return (
    <div className="bg-body" style={{ minHeight: '100vh' }}>
      <Navbar
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {currentView === 'home' && (
        <HomePage />
      )}

      {currentView === 'zakum' && (
        <ZakumGuide onViewChange={setCurrentView} />
      )}
    </div>
  );
}

export default App;

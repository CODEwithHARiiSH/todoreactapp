import React, { useState, ReactNode } from 'react';
import { ThemeProvider as EmotionThemeProvider, useTheme } from '@emotion/react';

export interface Theme {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  completedTaskColor: string;
  borderColor: string; 
}

const themes: { [key: string]: Theme } = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    buttonColor: '#4DB7FE',
    completedTaskColor: '',
    borderColor: ''
  },
  dark: {
    backgroundColor: '#333333',
    textColor: '#ffffff',
    buttonColor: '#ff6347',
    completedTaskColor: '',
    borderColor: ''
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <EmotionThemeProvider theme={themes[theme]}>
      <div>
        {children}
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </EmotionThemeProvider>
  );
};

export { ThemeProvider, useTheme };

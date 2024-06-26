// App.js

import React, { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Blog from './components/Blog';
import BlogEditor from './components/BlogEditor';
import Navbar from './components/Navbar';
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';
import EditPost from './components/EditPost';
import './App.css';

function App() {
  const currentTheme = useSelector(state => state.theme);
  const theme = currentTheme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    document.body.className = currentTheme === 'light' ? 'light-theme' : 'dark-theme';
  }, [currentTheme]);

  const getBackgroundImage = () => {
    if (currentTheme === 'light') {
      return`url(${process.env.PUBLIC_URL}/assets/8.jpg)`;
    } else {
      return `url(${process.env.PUBLIC_URL}/assets/eu8_01.jpg)`;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="app-container"
        style={{ backgroundImage: getBackgroundImage(), backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/editor" element={<BlogEditor />} />
          <Route path="/edit/:postId" element={<EditPost />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

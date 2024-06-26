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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/editor" element={<BlogEditor />} />
        <Route path="/edit/:postId" element={<EditPost />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

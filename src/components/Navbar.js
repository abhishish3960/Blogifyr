import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Switch } from '@mui/material';
import { Brightness4 as DarkIcon, Brightness7 as LightIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/actions';
import './navbar.css'; // Make sure to import the CSS file
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => state.theme);
  const navigate = useNavigate();
  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <AppBar position="static" className={`navbar ${currentTheme === 'dark' ? 'dark-theme' : ''}`}>
      <Toolbar>
      <div className="home-icon" onClick={() => navigate('/')}>
        <img src={`${process.env.PUBLIC_URL}/iconfinder-blogger-4550864_121345.ico`} alt="Homepage"  className='home-logo'/>
      </div>
        {/* <Typography variant="h6" component={Link} to="/" className="navbar-title">
          My Blog
        </Typography> */}
        <Button component={Link} to="/editor" variant="contained"  className="create-post-button">
          Create Post
        </Button>
        <div className="theme-toggler">
          <Switch
            checked={currentTheme === 'dark'}
            onChange={handleThemeChange}
            color="default"
            icon={<LightIcon />}
            checkedIcon={<DarkIcon />}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

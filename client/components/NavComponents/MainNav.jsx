import React from 'react';
import { Link } from 'react-router-dom';

const MainNav = (props) => {
  return (
    <div id="main-nav">
      <Link to="/">Home</Link>
      <div>
        <Link to="/campus">Campuses</Link>
        <Link to="/student">Students</Link>
      </div>
    </div>
  );
};

export default MainNav;

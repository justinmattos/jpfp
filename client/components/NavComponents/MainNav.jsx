import React from 'react';
import { Link } from 'react-router-dom';

const MainNav = () => {
  return (
    <div id="main-nav">
      <Link to="/">Home</Link>
      <div>
        <Link to="/campus/all">Campuses</Link>
        <Link to="/student/all">Students</Link>
      </div>
    </div>
  );
};

export default MainNav;

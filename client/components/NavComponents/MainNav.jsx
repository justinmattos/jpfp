import React from 'react';
import { Link } from 'react-router-dom';

const MainNav = (props) => {
  return (
    <div id="main-nav">
      <Link to="/">Home</Link>
      <div>
        <Link to="/campus/all/sortByName/1/10">Campuses</Link>
        <Link to="/student/all/sortByName/1/20">Students</Link>
      </div>
    </div>
  );
};

export default MainNav;

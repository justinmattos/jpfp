import React from 'react';
import { Link } from 'react-router-dom';

const MainNav = (props) => {
  return (
    <div id="main-nav">
      <Link to="/">Home</Link>
      <div>
        <Link to="/campusList/0">Campuses</Link>
        <Link to="/studentList/0">Students</Link>
      </div>
    </div>
  );
};

export default MainNav;

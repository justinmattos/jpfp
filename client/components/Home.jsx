import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampusStudents } from '../store/campus/campusStudents.js';

const Home = () => {
  return (
    <div>
      <h1>Campus and Student Database</h1>
      <p>
        This app was built by Justin Mattos for their Junior Phase Final Project
        at Fullstack Academy.
      </p>
    </div>
  );
};

export default Home;

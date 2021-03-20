import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import MainNav from './MainNav.jsx';
import CampusList from './CampusList.jsx';
import StudentList from './StudentList.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="header">
          <MainNav />
        </div>
        <div id="content">
          <Route component={CampusList} path="/campusList/:page" />
          <Route component={StudentList} path="/studentList/:page" />
        </div>
      </Router>
    );
  }
}

export default connect(null, null)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import MainNav from './NavComponents/MainNav.jsx';
import CampusList from './CampusComponents/CampusList.jsx';
import CampusDetail from './CampusComponents/CampusDetail.jsx';
import StudentList from './StudentComponents/StudentList.jsx';
import StudentDetail from './StudentComponents/StudentDetail.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="header">
          <MainNav />
        </div>
        <div id="content">
          <Route component={CampusList} path="/campusList/:page" exact />
          <Route component={CampusDetail} path="/campusList/campus/:id/:page" />
          <Route component={StudentList} path="/studentList/:page" exact />
          <Route component={StudentDetail} path="/studentList/student/:id" />
        </div>
      </Router>
    );
  }
}

export default connect(null, null)(App);

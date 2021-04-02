import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import MainNav from './NavComponents/MainNav.jsx';
import CampusList from './CampusComponents/CampusList.jsx';
import CampusDetail from './CampusComponents/CampusDetail.jsx';
import StudentList from './StudentComponents/StudentList.jsx';
import StudentDetail from './StudentComponents/StudentDetail.jsx';
import CampusForm from './CampusComponents/CampusForm.jsx';
import StudentForm from './StudentComponents/StudentForm.jsx';
import Home from './Home.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="header">
          <MainNav />
        </div>
        <div id="content">
          <Switch>
            <Route component={CampusList} path="/campus/all" />
            <Route component={CampusForm} path="/campus/add" />
            <Route component={CampusForm} path="/campus/:campusId/edit" />
            <Route component={CampusDetail} path="/campus/:campusId" />
            <Route component={StudentList} path="/student/all" />
            <Route component={StudentForm} path="/student/add" />
            <Route component={StudentForm} path="/student/:studentId/edit" />
            <Route component={StudentDetail} path="/student/:studentId" />
            <Route component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(null, null)(App);

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

class App extends Component {
  render() {
    return (
      <Router>
        <div id="header">
          <MainNav />
        </div>
        <div id="content">
          <Switch>
            <Route component={CampusForm} path="/campusList/campus/:id/edit" />
            <Route
              component={CampusDetail}
              path="/campusList/campus/:id/:page"
            />
            <Route component={CampusForm} path="/campusList/add" />
            <Route component={CampusList} path="/campusList/:page" exact />
            <Route
              component={StudentForm}
              path="/studentList/student/:id/edit"
            />
            <Route component={StudentDetail} path="/studentList/student/:id" />
            <Route component={StudentForm} path="/studentList/add" />
            <Route component={StudentList} path="/studentList/:page" exact />
            <Route>
              <div className="not-found">
                <h2>Page Not Found</h2>
                <p>Sorry, that page does not seem to exist . . .</p>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(null, null)(App);

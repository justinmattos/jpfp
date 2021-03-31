import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampusStudents } from '../store/campus/campusStudents.js';

class Home extends Component {
  componentDidMount() {
    console.log(this.props);
    const { fetchCampusStudents } = this.props;
    fetchCampusStudents({
      campusId: '6c3af9f0-c7f8-4b7d-88a1-30ce4fe5915e',
      page: 1,
      size: 20,
      sort: 'lastName',
    });
  }
  render() {
    return (
      <div>
        <h1>Campus and Student Database</h1>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { ...state, ...ownProps };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCampusStudents: ({ campusId, page, size, sort }) =>
      dispatch(fetchCampusStudents({ campusId, page, size, sort })),
  };
};

export default connect(null, mapDispatchToProps)(Home);

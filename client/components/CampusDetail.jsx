import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampusDetail } from '../store/campusDetail';
import CampusCard from './CampusCard.jsx';
import StudentList from './StudentList.jsx';

class CampusDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    this.props.fetchCampusDetail(id);
  }
  render() {
    const { campusDetail, studentList } = this.props;
    return (
      <div>
        <CampusCard campus={campusDetail} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { campusDetail, studentList } = state;
  return { campusDetail, studentList };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCampusDetail: (id) => dispatch(fetchCampusDetail(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusDetail);

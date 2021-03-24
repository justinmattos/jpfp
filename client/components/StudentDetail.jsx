import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampusList } from '../store/campusList';
import { fetchStudentDetail } from '../store/studentDetail';
import CampusCard from './CampusCard.jsx';

class StudentDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStudentDetail(id);
    this.props.fetchCampusList();
  }
  render() {
    const { studentDetail } = this.props;
    const fullName = studentDetail.fullName || 'Loading Student';
    const imageURL = studentDetail.imageURL || '';
    const GPA = studentDetail.GPA || '';
    const email = studentDetail.email || '';
    const campus = studentDetail.campus || '';
    const { campusList } = this.props;
    return (
      <div className="student-detail">
        <img className="student-detail-img" src={imageURL} />
        <div className="student-detail-info">
          <div>
            <h1>{fullName}</h1>
            <p>Email: {email}</p>
            <p>GPA: {GPA}</p>
          </div>
          <div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
          <div>
            {campus
              ? 'This student is registered to a campus'
              : 'This student is not registered to a campus'}
          </div>
          {campus ? <CampusCard campus={campus} /> : ''}
          <div className="campus-select">
            <select>
              {campusList.map((campusOption) => {
                if (campusOption.id !== campus.id) {
                  return (
                    <option key={campusOption.id}>{campusOption.name}</option>
                  );
                }
              })}
            </select>
            <button>Change Campus</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { studentDetail, campusList } = state;
  return { studentDetail, campusList };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchStudentDetail: (id) => dispatch(fetchStudentDetail(id)),
    fetchCampusList: () => dispatch(fetchCampusList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetail);

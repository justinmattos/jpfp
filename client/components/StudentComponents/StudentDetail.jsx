import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampusList } from '../../store/campus/campusList';
import { fetchStudentDetail } from '../../store/student/studentDetail';
import deleteStudent from '../../store/student/deleteStudent';
import CampusCard from '../CampusComponents/CampusCard.jsx';
import { Link } from 'react-router-dom';

class StudentDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStudentDetail(id);
    this.props.fetchCampusList();
  }
  render() {
    const { studentDetail, history, deleteStudent } = this.props;
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
            <Link to={`/studentList/student/${studentDetail.id}/edit`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => deleteStudent(studentDetail.id)}>
              Delete
            </button>
          </div>
          <div>
            {campus
              ? 'This student is registered to a campus'
              : 'This student is not registered to a campus'}
          </div>
          {campus ? (
            <CampusCard campus={campus} history={history} student />
          ) : (
            ''
          )}
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
  const { history } = ownProps;
  return { studentDetail, campusList, history };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    fetchStudentDetail: (id) => dispatch(fetchStudentDetail(id)),
    fetchCampusList: () => dispatch(fetchCampusList()),
    deleteStudent: (id) => dispatch(deleteStudent(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetail);

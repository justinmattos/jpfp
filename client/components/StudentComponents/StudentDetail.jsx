import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampusList } from '../../store/campus/campusList';
import { fetchStudentDetail } from '../../store/student/studentDetail';
import deleteStudent from '../utils/deleteStudent';
import CampusCard from '../CampusComponents/CampusCard.jsx';
import { Link } from 'react-router-dom';
import editStudent from '../utils/editStudent';

class StudentDetail extends Component {
  componentDidMount() {
    const { id } = this.props;
    this.props.fetchStudentDetail(id);
    this.props.fetchCampusList();
  }

  componentDidUpdate({
    studentDetail: { campusId: prevCampusId },
    id: prevId,
  }) {
    const {
      id,
      studentDetail: { campusId },
    } = this.props;
    if (id !== prevId || campusId !== prevCampusId) {
      this.props.fetchStudentDetail(id);
    }
  }

  changeCampus = (ev) => {
    const { id, studentDetail } = this.props;
    const newCampusId = document.querySelector('#campus-select').value;
    const updatedStudent = { ...studentDetail, campusId: newCampusId };
    delete updatedStudent.fullName;
    this.props.editStudent(updatedStudent, id);
  };

  render() {
    const { studentDetail, history, deleteStudent } = this.props;
    const fullName = studentDetail.fullName || 'Loading Student';
    const imageURL = studentDetail.imageURL || '';
    const GPA = studentDetail.GPA || '';
    const email = studentDetail.email || '';
    const campus = studentDetail.campus || '';
    const { campusList } = this.props;
    return (
      <div>
        {studentDetail === '' ? (
          <div>
            <h2>Sorry, it seems that student is not in the database</h2>
            <Link to="/studentList/0">
              <button>Return to All Students</button>
            </Link>
          </div>
        ) : (
          <div className="student-detail">
            <img className="student-detail-img" src={imageURL} />
            <div className="student-detail-info">
              <div>
                <h2>{fullName}</h2>
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { studentDetail, campusList } = state;
  const { history } = ownProps;
  const { id } = ownProps.match.params;
  return { studentDetail, campusList, id, history };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    fetchStudentDetail: (id) => {
      dispatch(fetchStudentDetail(id));
    },
    fetchCampusList: () => {
      dispatch(fetchCampusList());
    },
    deleteStudent: (id) => {
      dispatch(deleteStudent(id, history));
    },
    editStudent: (updatedStudent, studentId) => {
      dispatch(editStudent(updatedStudent, studentId, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetail);

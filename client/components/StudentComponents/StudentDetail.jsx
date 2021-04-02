import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllCampus } from '../../store/campus/campusList';
import { fetchStudentDetail } from '../../store/student/studentDetail';
import deleteStudent from '../../store/student/deleteStudent';
import CampusCard from '../CampusComponents/CampusCard.jsx';
import { Link } from 'react-router-dom';
import editStudent from '../utils/editStudent';

class StudentDetail extends Component {
  componentDidMount() {
    const { studentId } = this.props;
    this.props.fetchStudentDetail(studentId);
    this.props.fetchAllCampus();
  }

  componentDidUpdate({
    studentDetail: { campusId: prevCampusId },
    studentId: prevStudentId,
  }) {
    const {
      studentId,
      studentDetail: { campusId },
    } = this.props;
    if (studentId !== prevStudentId || campusId !== prevCampusId) {
      this.props.fetchStudentDetail(studentId);
    }
  }

  render() {
    const { studentDetail, history, deleteStudent } = this.props;
    const fullName = studentDetail.fullName || 'Loading Student';
    const imageURL = studentDetail.imageURL || '';
    const GPA = studentDetail.GPA || 0;
    const email = studentDetail.email || '';
    const campus = studentDetail.campus || '';
    const studentId = studentDetail.studentId || '';
    return (
      <div>
        {studentDetail === '' ? (
          <div>
            <h2>Sorry, it seems that student is not in the database</h2>
            <Link to="/student/all/sortByName/1/20">
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
                <p>GPA: {GPA.toFixed(2)}</p>
              </div>
              <div>
                <Link to={`/student/${studentId}/edit`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => deleteStudent(studentId)}>Delete</button>
              </div>
              <div>
                {campus
                  ? 'This student is registered to a campus'
                  : 'This student is not registered to a campus'}
              </div>
              {campus ? (
                <CampusCard
                  campus={campus}
                  history={history}
                  pageDetail={{ sort: null, page: null, size: null }}
                  student
                />
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
  const { studentId } = ownProps.match.params;
  return { studentDetail, campusList, studentId, history };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    fetchStudentDetail: (studentId) => {
      dispatch(fetchStudentDetail(studentId));
    },
    fetchAllCampus: () => {
      dispatch(fetchAllCampus());
    },
    deleteStudent: (studentId) => {
      dispatch(
        deleteStudent({ studentId, sort: 'sortByName', page: 1, size: 20 })
      );
      history.push(`/student/all/sortByName/1/20`);
    },
    editStudent: (updatedStudent, studentId) => {
      dispatch(editStudent(updatedStudent, studentId, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetail);

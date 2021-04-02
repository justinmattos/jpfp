import React, { Component } from 'react';
import { connect } from 'react-redux';
import deleteStudent from '../../store/student/deleteStudent';
import deregisterStudent from '../../store/student/deregisterStudent';

class StudentCard extends Component {
  linkToStudent = (ev) => {
    const { student, history } = this.props;
    if (ev.target.tagName !== 'BUTTON') {
      history.push(`/student/${student.studentId}`);
    }
  };
  render() {
    const { student, campusId, deleteStudent, deregisterStudent } = this.props;
    const campusName = student.campus
      ? student.campus.name
      : 'No Campus Registered';
    const { imageURL, fullName, GPA, studentId } = student;
    return (
      <div className="student-card-wrapper" onClick={this.linkToStudent}>
        <div className="student-card">
          <img src={imageURL} />
          <h4>{fullName}</h4>
          {campusId ? '' : <h5>{campusName}</h5>}
          <h5>GPA: {GPA.toFixed(2)}</h5>
          <button
            onClick={
              campusId
                ? () => deregisterStudent(studentId)
                : () => deleteStudent(studentId)
            }
          >
            {campusId ? 'Deregister' : 'Delete'}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { ...ownProps };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { campusId } = ownProps;
  return {
    deleteStudent: (studentId) => {
      dispatch(deleteStudent(studentId));
    },
    deregisterStudent: (studentId) => {
      dispatch(deregisterStudent(studentId, campusId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCard);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import deleteStudent from '../../store/student/deleteStudent';
import deregisterStudent from '../../store/student/deregisterStudent';

class StudentCard extends Component {
  linkToStudent = (ev) => {
    const { student, history } = this.props;
    if (ev.target.tagName !== 'BUTTON') {
      history.push(`/studentList/student/${student.id}`);
    }
  };
  render() {
    const { student, campus, deleteStudent, deregisterStudent } = this.props;
    const campusName = student.campus ? student.campus.name : '';
    return (
      <div className="student-card-wrapper" onClick={this.linkToStudent}>
        <div className="student-card">
          <img src={student.imageURL} />
          <h4>{student.fullName}</h4>
          {campus ? '' : <h5>{campusName}</h5>}
          <button
            onClick={
              campus
                ? () => deregisterStudent(student.id)
                : () => deleteStudent(student.id)
            }
          >
            {campus ? 'Deregister' : 'Delete'}
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
  const { history, campus } = ownProps;
  return {
    deleteStudent: (studentId) => {
      dispatch(deleteStudent(studentId, history));
    },
    deregisterStudent: (studentId) => {
      const { id: campusId } = campus;
      dispatch(deregisterStudent(studentId, campusId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCard);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import deleteStudent from '../../store/deleteStudent';

class StudentCard extends Component {
  linkToStudent = (ev) => {
    const { student, history } = this.props;
    if (ev.target.tagName !== 'BUTTON') {
      history.push(`/studentList/student/${student.id}`);
    }
  };
  render() {
    const { student, campus, deleteStudent } = this.props;
    const campusName = student.campus ? student.campus.name : '';
    return (
      <div className="student-card-wrapper" onClick={this.linkToStudent}>
        <div className="student-card">
          <img src={student.imageURL} />
          <h4>{student.fullName}</h4>
          {campus ? '' : <h5>{campusName}</h5>}
          <button onClick={() => deleteStudent(student.id)}>Delete</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { ...ownProps };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    deleteStudent: (id) => {
      history.push('/studentList/0');
      dispatch(deleteStudent(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCard);

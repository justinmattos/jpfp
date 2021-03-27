import React, { Component } from 'react';
import { connect } from 'react-redux';
import addStudent from '../../store/student/addStudent';

class StudentForm extends Component {
  formSubmitAddStudent = (ev) => {
    ev.preventDefault();
    const newStudent = [
      'firstName',
      'lastName',
      'email',
      'imageURL',
      'GPA',
    ].reduce((acc, val) => {
      acc[val] = document.querySelector(`#${val}`).value;
      return acc;
    }, {});
    this.props.addStudent(newStudent);
  };
  render() {
    const { studentDetail } = this.props;
    const firstName = studentDetail.firstName || '';
    const lastName = studentDetail.lastName || '';
    const email = studentDetail.email || '';
    const imageURL = studentDetail.imageURL || '';
    const GPA = studentDetail.GPA || '';
    return (
      <form className="student-form form" onSubmit={this.formSubmitAddStudent}>
        <h2>Add a Student</h2>
        <label htmlFor="firstName">
          <p>Student First Name:</p>
          <input id="firstName" type="text" defaultValue={firstName} />
        </label>
        <label htmlFor="lastName">
          <p>Student Last Name:</p>
          <input id="lastName" type="text" defaultValue={lastName} />
        </label>
        <label htmlFor="email">
          <p>Student Email:</p>
          <input id="email" type="text" defaultValue={email} />
        </label>
        <label htmlFor="imageURL">
          <p>Student Image URL:</p>
          <input id="imageURL" type="url" defaultValue={imageURL} />
        </label>
        <label htmlFor="GPA">
          <p>Student GPA:</p>
          <input
            id="GPA"
            type="number"
            min="0.00"
            max="4.00"
            step="0.05"
            defaultValue={GPA}
          />
        </label>
        <button>Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { studentDetail } = state;
  return { studentDetail };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    addStudent: (newStudent) => {
      history.push('/studentList/0');
      dispatch(addStudent(newStudent));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);

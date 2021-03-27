import React, { Component } from 'react';
import { connect } from 'react-redux';
import addStudent from '../../store/student/addStudent';
import editStudent from '../../store/student/editStudent'; //need to create this!
import { fetchStudentDetail } from '../../store/student/studentDetail';

class StudentForm extends Component {
  componentDidMount() {
    const { id, editMode } = this.props;
    if (editMode) {
      this.props.fetchStudentDetail(id);
    }
  }

  getFormValues = () => {
    return ['firstName', 'lastName', 'email', 'imageURL', 'GPA'].reduce(
      (acc, val) => {
        acc[val] = document.querySelector(`#${val}`).value;
        return acc;
      },
      {}
    );
  };

  formSubmit = (ev) => {
    const { editMode, id } = this.props;
    ev.preventDefault();
    if (editMode) {
      this.props.editStudent(this.getFormValues(), id);
    } else {
      this.props.addStudent(this.getFormValues());
    }
  };

  render() {
    const { studentDetail, editMode } = this.props;
    const firstName = studentDetail.firstName || '';
    const lastName = studentDetail.lastName || '';
    const email = studentDetail.email || '';
    const imageURL = studentDetail.imageURL || '';
    const GPA = studentDetail.GPA || '';
    return (
      <form className="student-form form" onSubmit={this.formSubmit}>
        <h2>{editMode ? 'Edit' : 'Add a'} Student</h2>
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
            step="0.01"
            defaultValue={GPA}
          />
        </label>
        <button>Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { studentDetail } = state;
  const editMode = !!id;
  return { studentDetail, editMode, id };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    addStudent: (newStudent) => {
      dispatch(addStudent(newStudent, history));
    },
    editStudent: (updatedStudent, studentId) => {
      dispatch(editStudent(updatedStudent, studentId, history));
    },
    fetchStudentDetail: (id) => {
      dispatch(fetchStudentDetail(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);

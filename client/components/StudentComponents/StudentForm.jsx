import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllCampus } from '../../store/campus/campusList';
import addStudent from '../utils/addStudent';
import editStudent from '../utils/editStudent';
import { fetchStudentDetail } from '../../store/student/studentDetail';

class StudentForm extends Component {
  componentDidMount() {
    const { studentId, editMode } = this.props;
    if (editMode) {
      this.props.fetchStudentDetail(studentId);
    }
    this.props.fetchAllCampus();
  }

  getFormValues = () => {
    let validForm = true;
    const formData = [
      'firstName',
      'lastName',
      'email',
      'imageURL',
      'GPA',
      'campusId',
    ].reduce((acc, val) => {
      const currEl = document.querySelector(`#${val}`);
      if (!currEl.value && val !== 'campusId') {
        currEl.parentNode.className = 'invalid';
        validForm = false;
      } else {
        acc[val] = currEl.value;
      }
      return acc;
    }, {});
    if (validForm) {
      console.log(formData);
      return formData;
    } else {
      return validForm;
    }
  };

  formSubmit = (ev) => {
    const { editMode, studentId } = this.props;
    ev.preventDefault();
    const formData = this.getFormValues();
    if (formData) {
      if (editMode) {
        this.props.editStudent(formData, studentId);
      } else {
        this.props.addStudent(formData);
      }
    } else {
      alert('Please fill all required fields');
    }
  };

  render() {
    const { studentDetail, campusList, editMode } = this.props;
    const firstName = studentDetail.firstName || '';
    const lastName = studentDetail.lastName || '';
    const email = studentDetail.email || '';
    const imageURL = studentDetail.imageURL || '';
    const GPA = studentDetail.GPA || '';
    const campus = studentDetail.campus || '';
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
        <label htmlFor="campusId">
          <p>Campus:</p>
          <select id="campusId">
            {!!campus ? (
              ''
            ) : (
              <option key="0" value="" selected>
                -- Select a Campus (not required) --
              </option>
            )}
            {campusList.map((campusOption) => {
              const { name, campusId } = campusOption;
              return (
                <option
                  key={campusId}
                  value={campusId}
                  selected={campusId === campus.campusId ? true : false}
                >
                  {name}
                </option>
              );
            })}
          </select>
        </label>
        <button>Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { studentId } = ownProps.match.params;
  const { studentDetail, campusList } = state;
  const editMode = !!studentId;
  return { studentDetail, campusList, editMode, studentId };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    addStudent: (newStudent) => {
      addStudent(newStudent, history);
    },
    editStudent: (updatedStudent, studentId) => {
      editStudent(updatedStudent, studentId, history);
    },
    fetchStudentDetail: (studentId) => {
      dispatch(fetchStudentDetail(studentId));
    },
    fetchAllCampus: () => {
      dispatch(fetchAllCampus());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);

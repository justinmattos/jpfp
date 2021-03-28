import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampusList } from '../../store/campus/campusList';
import addStudent from '../../store/student/addStudent';
import editStudent from '../../store/student/editStudent';
import { fetchStudentDetail } from '../../store/student/studentDetail';

class StudentForm extends Component {
  componentDidMount() {
    const { id, editMode } = this.props;
    if (editMode) {
      this.props.fetchStudentDetail(id);
    }
    this.props.fetchCampusList();
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
      if (!currEl.value) {
        console.log(currEl);
        currEl.parentNode.className = 'invalid';
        validForm = false;
      } else {
        acc[val] = currEl.value;
      }
      return acc;
    }, {});
    if (validForm) {
      return formData;
    } else {
      return validForm;
    }
  };

  formSubmit = (ev) => {
    const { editMode, id } = this.props;
    ev.preventDefault();
    const formData = this.getFormValues();
    if (formData) {
      if (editMode) {
        this.props.editStudent(formData, id);
      } else {
        this.props.addStudent(formData);
      }
    } else {
      alert('Please fill all required fields');
    }
  };

  render() {
    const { studentDetail, campusList, editMode } = this.props;
    console.log(studentDetail);
    const firstName = studentDetail.firstName || '';
    const lastName = studentDetail.lastName || '';
    const email = studentDetail.email || '';
    const imageURL = studentDetail.imageURL || '';
    const GPA = studentDetail.GPA || '';
    const campus = studentDetail.campus || '';
    console.log(!!campus);
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
              <option key="0" value={null} selected>
                -- Select a Campus (not required) --
              </option>
            )}
            {campusList.map((campusOption) => {
              return (
                <option
                  key={campusOption.id}
                  value={campusOption.id}
                  selected={campusOption.id === campus.id ? true : false}
                >
                  {campusOption.name}
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
  const { id } = ownProps.match.params;
  const { studentDetail, campusList } = state;
  const editMode = !!id;
  return { studentDetail, campusList, editMode, id };
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
    fetchCampusList: () => {
      dispatch(fetchCampusList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllCampus } from '../../store/campus/campusList';
import addStudent from '../utils/addStudent';
import editStudent from '../utils/editStudent';
import { fetchStudentDetail } from '../../store/student/studentDetail';

//SOMETHING IS BROKEN HERE FOR ADD STUDENT MODE

class StudentForm extends Component {
  state = {
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      imageURL: '',
      GPA: 0,
      campusId: '',
    },
  };

  componentDidMount() {
    const {
      studentId,
      studentDetail: { firstName, lastName, email, imageURL, GPA, campusId },
      editMode,
      fetchStudentDetail,
      fetchAllCampus,
    } = this.props;
    if (editMode) {
      this.setState({
        formData: {
          firstName,
          lastName,
          email,
          imageURL,
          GPA,
          campusId: campusId || '',
        },
      });
      fetchStudentDetail(studentId);
    }
    fetchAllCampus();
  }

  componentDidUpdate = ({ studentDetail: { studentId: prevStudentId } }) => {
    const { studentDetail } = this.props;
    const {
      studentId,
      firstName,
      lastName,
      email,
      imageURL,
      GPA,
      campusId,
    } = studentDetail;
    if (studentId !== prevStudentId) {
      this.setState({
        formData: {
          firstName,
          lastName,
          email,
          imageURL,
          GPA,
          campusId: campusId || '',
        },
      });
    }
  };

  formChange = ({ target: { name, value, parentNode } }) => {
    if (name !== 'campusId') {
      if (value === '') {
        parentNode.className = 'invalid';
      } else {
        parentNode.className = '';
      }
    }
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, [name]: value },
    });
  };

  formSubmit = (ev) => {
    ev.preventDefault();
    const { editMode, studentId, editStudent, addStudent } = this.props;
    const submitData = { ...this.state.formData };
    let validForm = true;
    for (const key in submitData) {
      if (key !== 'campusId' && key !== 'GPA') {
        if (!submitData[key]) {
          document.querySelector(`#${key}`).parentNode.className = 'invalid';
          validForm = false;
        }
      } else if (key === 'campusId') {
        if (!submitData[key]) {
          submitData[key] = undefined;
        }
      }
    }
    if (validForm) {
      if (editMode) {
        editStudent(submitData, studentId);
      } else {
        addStudent(submitData);
      }
    } else {
      alert('Please fill all required fields');
    }
  };

  render() {
    const { studentDetail, campusList, editMode, campus } = this.props;
    const { currentList } = campusList;
    const {
      formData: { firstName, lastName, email, imageURL, GPA, campusId },
    } = this.state;
    // const firstName = studentDetail.firstName || '';
    // const lastName = studentDetail.lastName || '';
    // const email = studentDetail.email || '';
    // const imageURL = studentDetail.imageURL || '';
    // const GPA = studentDetail.GPA || '';
    return (
      <div>
        <h2 className="form-title">{editMode ? 'Edit' : 'Add a'} Student</h2>
        <form className="student-form form" onSubmit={this.formSubmit}>
          <label htmlFor="firstName">
            <p>Student First Name:</p>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={this.formChange}
              placeholder="Required"
            />
          </label>
          <label htmlFor="lastName">
            <p>Student Last Name:</p>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={this.formChange}
              placeholder="Required"
            />
          </label>
          <label htmlFor="email">
            <p>Student Email:</p>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={this.formChange}
              placeholder="Required"
            />
          </label>
          <label htmlFor="imageURL">
            <p>Student Image URL:</p>
            <input
              id="imageURL"
              name="imageURL"
              type="url"
              value={imageURL}
              onChange={this.formChange}
              placeholder="Required"
            />
          </label>
          <label htmlFor="GPA">
            <p>Student GPA:</p>
            <input
              id="GPA"
              name="GPA"
              type="number"
              min="0.00"
              max="4.00"
              step="0.01"
              value={GPA}
              onChange={this.formChange}
            />
          </label>
          <label htmlFor="campusId">
            <p>Campus:</p>
            <select
              id="campusId"
              name="campusId"
              value={campusId}
              onChange={this.formChange}
            >
              <option key="0" value="">
                {campus ? '-- Deregister Student --' : '-- Select a Campus --'}
              </option>
              {currentList.map((campusOption) => {
                const { name, campusId } = campusOption;
                return (
                  <option key={campusId} value={campusId}>
                    {name}
                  </option>
                );
              })}
            </select>
          </label>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { studentId } = ownProps.match.params;
  const { studentDetail, campusList } = state;
  const { campusId } = studentDetail;
  const campus = !!campusId;
  const editMode = !!studentId;
  return { studentDetail, campusList, editMode, studentId, campus, campusId };
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

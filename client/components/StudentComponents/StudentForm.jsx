import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllCampus } from '../../store/campus/campusList';
import addStudent from '../utils/addStudent';
import editStudent from '../utils/editStudent';
import { fetchStudentDetail } from '../../store/student/studentDetail';

//SOMETHING IS BROKEN HERE FOR ADD STUDENT MODE

class StudentForm extends Component {
  state = { selectValue: '' };

  componentDidMount() {
    const {
      studentId,
      campusId,
      editMode,
      fetchStudentDetail,
      fetchAllCampus,
    } = this.props;
    if (editMode) {
      this.setState({ selectValue: campusId });
      fetchStudentDetail(studentId);
    }
    fetchAllCampus();
  }

  componentDidUpdate({ studentDetail: { studentId: prevStudentId } }) {
    const {
      studentDetail: { studentId },
      campusId,
    } = this.props;
    if (studentId !== prevStudentId) {
      this.setState({ selectValue: campusId });
    }
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

  selectOnChange = ({ target: { value: selectValue } }) => {
    this.setState({ selectValue });
  };

  render() {
    const {
      studentDetail,
      campusList,
      editMode,
      campus,
      campusId,
    } = this.props;
    const { currentList } = campusList;
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
        <label htmlFor="campusId">
          <p>Campus:</p>
          <select
            id="campusId"
            value={this.state.selectValue}
            onChange={this.selectOnChange}
          >
            <option key="0" value="">
              {campus
                ? '-- Deregister Student --'
                : '-- Select a Campus (not required) --'}
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

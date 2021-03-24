import axios from 'axios';

const SET_STUDENT_DETAIL = 'SET_STUDENT_DETAIL';

export const setStudentDetail = (student) => {
  return {
    type: SET_STUDENT_DETAIL,
    student,
  };
};

export const fetchStudentDetail = (id) => {
  return (dispatch) => {
    axios
      .get(`/api/studentList/${id}`)
      .then(({ data }) => {
        dispatch(setStudentDetail(data));
      })
      .catch(console.error);
  };
};

const initialState = {};

export default (state = initialState, action) => {
  const { type, student } = action;
  if (type === SET_STUDENT_DETAIL) return student;
  else return state;
};

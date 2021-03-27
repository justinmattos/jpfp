import axios from 'axios';
import { setStudentDetail } from './studentDetail';

const SET_STUDENT_LIST = 'SET_STUDENT_LIST';

export const setStudentList = (studentList) => {
  return {
    type: SET_STUDENT_LIST,
    studentList,
  };
};

export const fetchStudentList = () => {
  return (dispatch) => {
    axios
      .get('/api/studentList')
      .then(({ data }) => {
        dispatch(setStudentDetail({}));
        dispatch(setStudentList(data));
      })
      .catch(console.error);
  };
};

const initialState = [];

export default (state = initialState, action) => {
  const { type, studentList } = action;
  if (type === SET_STUDENT_LIST) return studentList;
  else return state;
};

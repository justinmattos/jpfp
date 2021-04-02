import axios from 'axios';
import { setStudentDetail } from './studentDetail';

const SET_STUDENT_LIST = 'SET_STUDENT_LIST';

export const setStudentList = (students) => {
  return {
    type: SET_STUDENT_LIST,
    students,
  };
};

export const fetchStudentList = ({ sort, page, size }) => {
  return (dispatch) => {
    axios
      .get(`/api/student/${sort}/${page}/${size}`)
      .then(({ data }) => {
        dispatch(setStudentDetail({}));
        dispatch(setStudentList(data));
      })
      .catch(console.error);
  };
};

const initialState = [];

export default (state = initialState, action) => {
  const { type, students } = action;
  if (type === SET_STUDENT_LIST) return students;
  else return state;
};

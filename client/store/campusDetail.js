import axios from 'axios';
import { setStudentList } from './studentList';

export const SET_CAMPUS_DETAIL = 'SET_CAMPUS_DETAIL';

export const setCampusDetail = (campus) => {
  return {
    type: SET_CAMPUS_DETAIL,
    campus,
  };
};

export const fetchCampusDetail = (id) => {
  return (dispatch) => {
    axios
      .get(`/api/campusList/campus/${id}`)
      .then(({ data }) => {
        dispatch(setCampusDetail(data));
        const { students } = data;
        dispatch(setStudentList(students));
      })
      .catch(console.error);
  };
};

const initialState = {};

export default (state = initialState, action) => {
  const { type, campus } = action;
  if (type === SET_CAMPUS_DETAIL) return campus;
  else return state;
};

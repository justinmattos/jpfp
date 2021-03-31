import axios from 'axios';

export const SET_CAMPUS_STUDENTS = 'SET_CAMPUS_STUDENTS';

export const setCampusStudents = (students) => {
  return {
    type: SET_CAMPUS_STUDENTS,
    students,
  };
};

export const fetchCampusStudents = ({ campusId, page, size, sort }) => {
  return (dispatch) => {
    axios
      .get(`/api/campus/${campusId}/students/${page}/${size}/${sort}`)
      .then(({ data }) => {
        dispatch(setCampusStudents(data));
      })
      .catch(console.error);
  };
};

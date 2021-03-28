import axios from 'axios';

export const SET_CAMPUS_DETAIL = 'SET_CAMPUS_DETAIL';

export const setCampusDetail = (campus) => {
  return {
    type: SET_CAMPUS_DETAIL,
    campus,
  };
};

export const fetchCampusDetail = (id, sortStudentsBy = 'lastName') => {
  return (dispatch) => {
    axios
      .get(`/api/campusList/campus/${id}/${sortStudentsBy}`)
      .then(({ data }) => {
        dispatch(setCampusDetail(data));
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

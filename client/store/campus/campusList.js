import axios from 'axios';
import { setCampusDetail } from './campusDetail';

const SET_CAMPUS_LIST = 'SET_CAMPUS_LIST';

export const setCampusList = (campusList) => {
  return {
    type: SET_CAMPUS_LIST,
    campusList,
  };
};

export const fetchCampusList = ({ page, size, sort }) => {
  return (dispatch) => {
    axios
      .get(`/api/campus/${page}/${size}/${sort}`)
      .then(({ data }) => {
        dispatch(setCampusDetail({}));
        dispatch(setCampusList(data));
      })
      .catch(console.error);
  };
};

const initialState = [];

export default (state = initialState, action) => {
  const { type, campusList } = action;
  if (type === SET_CAMPUS_LIST) return campusList;
  else return state;
};

import axios from 'axios';
import { fetchCampusList } from './campusList';

export default (campusId) => {
  return (dispatch) => {
    axios
      .delete(`/api/campusList/campus/${campusId}`)
      .then(() => {
        dispatch(fetchCampusList());
      })
      .catch(console.error);
  };
};

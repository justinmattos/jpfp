import axios from 'axios';
import { fetchCampusDetail } from './campusDetail';

export default (updatedCampus, campusId) => {
  return (dispatch) => {
    axios
      .put(`/api/campusList/campus/${campusId}`, updatedCampus)
      .then(() => {
        dispatch(fetchCampusDetail(campusId));
      })
      .catch(console.error);
  };
};

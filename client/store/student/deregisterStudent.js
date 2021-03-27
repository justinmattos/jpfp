import axios from 'axios';
import { fetchCampusDetail } from '../campus/campusDetail';

export default (studentId, campusId) => {
  return (dispatch) => {
    console.log('sending updated student to server');
    axios
      .put(`/api/studentList/deregister/${studentId}/${campusId}`)
      .then(() => dispatch(fetchCampusDetail(campusId)))
      .catch(console.error);
  };
};

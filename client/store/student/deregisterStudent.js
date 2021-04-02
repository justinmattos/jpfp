import axios from 'axios';
import { fetchCampusDetail } from '../campus/campusDetail';

export default (studentId, campusId) => {
  return (dispatch) => {
    axios
      .put(`/api/student/deregister/${studentId}/${campusId}`)
      .then(() => dispatch(fetchCampusDetail(campusId)))
      .catch(console.error);
  };
};

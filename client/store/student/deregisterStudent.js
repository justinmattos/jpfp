import axios from 'axios';
import { fetchCampusDetail } from '../campus/campusDetail';
import { fetchCampusStudents } from '../campus/campusStudents';

export default (studentId, campusId) => {
  return (dispatch, getState) => {
    axios
      .put(`/api/student/deregister/${studentId}/${campusId}`)
      .then(() => {
        const { pageDetail } = getState();
        dispatch(fetchCampusDetail(campusId));
        dispatch(fetchCampusStudents({ campusId, ...pageDetail }));
      })
      .catch(console.error);
  };
};

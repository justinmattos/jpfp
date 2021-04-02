import axios from 'axios';
import { fetchStudentList } from './studentList';

//Need to update components to use this as a util rather than dispatch thunk

export default (studentId) => {
  return (dispatch, getState) => {
    axios
      .delete(`/api/student/${studentId}`)
      .then(() => {
        const { pageDetail } = getState();
        dispatch(fetchStudentList(pageDetail));
      })
      .catch(console.error);
  };
};

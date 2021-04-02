import axios from 'axios';
import { fetchStudentList } from './studentList';

//Need to update components to use this as a util rather than dispatch thunk

export default ({ studentId, sort, page, size }) => {
  return (dispatch) => {
    axios
      .delete(`/api/student/${studentId}`)
      .then(() => {
        console.log(`Deleted student ${studentId}`);
        dispatch(fetchStudentList({ sort, page, size }));
      })
      .catch(console.error);
  };
};

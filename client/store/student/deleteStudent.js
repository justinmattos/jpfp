import axios from 'axios';
import { fetchStudentList } from './studentList';

export default (studentId, history) => {
  return (dispatch) => {
    axios
      .delete(`/api/studentList/student/${studentId}`)
      .then(() => {
        dispatch(fetchStudentList());
        history.push('/studentList/0');
      })
      .catch(console.error);
  };
};

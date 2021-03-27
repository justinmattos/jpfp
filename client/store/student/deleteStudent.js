import axios from 'axios';
import { fetchStudentList } from './studentList';

export default (studentId) => {
  return (dispatch) => {
    axios
      .delete(`/api/studentList/student/${studentId}`)
      .then(() => dispatch(fetchStudentList()))
      .catch(console.error);
  };
};

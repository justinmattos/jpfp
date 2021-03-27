import axios from 'axios';
import { fetchStudentList } from './studentList';

export default (newStudent) => {
  return (dispatch) => {
    axios
      .post('/api/studentList', newStudent)
      .then(() => {
        dispatch(fetchStudentList());
      })
      .catch(console.error);
  };
};

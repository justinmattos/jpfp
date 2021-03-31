import axios from 'axios';

//Need to update components to use this as a util rather than dispatch thunk

export default (studentId, history) => {
  axios
    .delete(`/api/studentList/student/${studentId}`)
    .then(() => {
      history.push('/studentList/0');
    })
    .catch(console.error);
};

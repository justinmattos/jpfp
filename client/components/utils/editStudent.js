import axios from 'axios';

//Need to update components to use this as a util rather than dispatch thunk

export default (updatedStudent, studentId, history) => {
  axios
    .put(`/api/studentList/student/${studentId}`, updatedStudent)
    .then(() => {
      history.push(`/studentList/student/${studentId}`);
    })
    .catch(console.error);
};

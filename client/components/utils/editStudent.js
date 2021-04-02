import axios from 'axios';

export default (updatedStudent, studentId, history) => {
  axios
    .put(`/api/student/${studentId}`, updatedStudent)
    .then(() => {
      history.push(`/student/${studentId}`);
    })
    .catch(console.error);
};

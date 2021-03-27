import axios from 'axios';

export default (updatedStudent, studentId, history) => {
  return (dispatch) => {
    axios
      .put(`/api/studentList/student/${studentId}`, updatedStudent)
      .then(() => {
        history.push(`/studentList/student/${studentId}`);
      })
      .catch(console.error);
  };
};

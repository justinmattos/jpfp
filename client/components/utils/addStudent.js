import axios from 'axios';

//Need to update components to use this as a util rather than dispatch thunk

export default (newStudent, history) => {
  axios
    .post('/api/student', newStudent)
    .then(({ data }) => {
      history.push(`/student/${data.studentId}`);
    })
    .catch(console.error);
};

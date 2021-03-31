import axios from 'axios';

//Need to update components to use this as a util rather than dispatch thunk

export default (newStudent, history) => {
  axios
    .post('/api/studentList', newStudent)
    .then(() => {
      history.push('/studentList/0');
    })
    .catch(console.error);
};

import axios from 'axios';

export default (newStudent, history) => {
  return (dispatch) => {
    axios
      .post('/api/studentList', newStudent)
      .then(() => {
        history.push('/studentList/0');
      })
      .catch(console.error);
  };
};

import axios from 'axios';

//Need to update components to use this as a util rather than dispatch thunk

export default (newCampus, history) => {
  axios
    .post('/api/campus', newCampus)
    .then(() => {
      history.push('/campus');
    })
    .catch(console.error);
};

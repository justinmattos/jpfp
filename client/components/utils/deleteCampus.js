import axios from 'axios';

//Need to update components to use this as a util rather than dispatch thunk

export default (campusId, history) => {
  axios
    .delete(`/api/campus/${campusId}`)
    .then(() => {
      history.push('/campusList/0');
    })
    .catch(console.error);
};

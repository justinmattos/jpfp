import axios from 'axios';

//Need to update components to use this as a util rather than dispatch thunk

export default (updatedCampus, campusId, history) => {
  axios
    .put(`/api/campus/${campusId}`, updatedCampus)
    .then(() => {
      history.push(`/campus/${campusId}`);
    })
    .catch(console.error);
};

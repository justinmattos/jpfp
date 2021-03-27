import axios from 'axios';

export default (updatedCampus, campusId, history) => {
  return (dispatch) => {
    axios
      .put(`/api/campusList/campus/${campusId}`, updatedCampus)
      .then(() => {
        history.push(`/campusList/campus/${campusId}/0`);
      })
      .catch(console.error);
  };
};

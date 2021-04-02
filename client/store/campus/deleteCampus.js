import axios from 'axios';
import { fetchCampusList } from './campusList';

export default (campusId) => {
  return (dispatch, getState) => {
    axios
      .delete(`/api/campus/${campusId}`)
      .then(() => {
        const { pageDetail } = getState();
        dispatch(fetchCampusList(pageDetail));
      })
      .catch(console.error);
  };
};

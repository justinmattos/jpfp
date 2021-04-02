import axios from 'axios';
import { fetchCampusList } from './campusList';

export default ({ campusId, sort, page, size }) => {
  return (dispatch) => {
    axios
      .delete(`/api/campus/${campusId}`)
      .then(() => {
        console.log(`Deleted campus ${campusId}`);
        dispatch(fetchCampusList({ sort, page, size }));
      })
      .catch(console.error);
  };
};

import axios from 'axios';
import { fetchCampusList } from './campusList';

export default (campusId, history) => {
  return (dispatch) => {
    axios
      .delete(`/api/campusList/campus/${campusId}`)
      .then(() => {
        dispatch(fetchCampusList());
        history.push('/campusList/0');
      })
      .catch(console.error);
  };
};

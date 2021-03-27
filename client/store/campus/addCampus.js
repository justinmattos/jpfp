import axios from 'axios';
import { fetchCampusList } from './campusList';

export default (newCampus) => {
  return (dispatch) => {
    axios
      .post('/api/campusList', newCampus)
      .then(() => {
        dispatch(fetchCampusList());
      })
      .catch(console.error);
  };
};

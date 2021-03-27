import axios from 'axios';

export default (newCampus, history) => {
  return (dispatch) => {
    axios
      .post('/api/campusList', newCampus)
      .then(() => {
        history.push('/campusList/0');
      })
      .catch(console.error);
  };
};

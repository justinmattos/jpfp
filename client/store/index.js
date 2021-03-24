import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import campusList from './campusList';
import campusDetail from './campusDetail';
import studentList from './studentList';
import studentDetail from './studentDetail';

const reducer = combineReducers({
  campusList,
  campusDetail,
  studentList,
  studentDetail,
});

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;

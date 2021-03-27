import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import campusList from './campus/campusList';
import campusDetail from './campus/campusDetail';
import studentList from './student/studentList';
import studentDetail from './student/studentDetail';

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

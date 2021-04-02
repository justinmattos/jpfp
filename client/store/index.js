import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import campusList from './campus/campusList';
import campusDetail from './campus/campusDetail';
import campusStudents from './campus/campusStudents';
import studentList from './student/studentList';
import studentDetail from './student/studentDetail';
import pageDetail from './pageDetail';

const reducer = combineReducers({
  campusList,
  campusDetail,
  campusStudents,
  studentList,
  studentDetail,
  pageDetail,
});

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;

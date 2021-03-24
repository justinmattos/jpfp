import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStudentList } from '../store/studentList';
import ListNav from './ListNav.jsx';
import StudentCard from './StudentCard.jsx';

class StudentList extends Component {
  componentDidMount() {
    this.props.fetchStudentList();
  }
  render() {
    const { studentList } = this.props;
    const { page } = this.props.match.params;
    const listSize = this.props.listSize || 20;
    const currList = studentList.slice(
      page * listSize,
      page * listSize + listSize
    );
    const maxPage = Math.ceil(studentList.length / listSize) - 1;
    return (
      <div className="list-parent">
        <h2>Student List</h2>
        <ListNav page={page} maxPage={maxPage} />
        <div className="student-list">
          {currList.map((student) => {
            return (
              <Link to={`./student/${student.id}`} key={student.id}>
                <StudentCard student={student} />
              </Link>
            );
          })}
        </div>
        <ListNav page={page} maxPage={maxPage} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { studentList } = state;
  return { studentList, ...ownProps };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchStudentList: () => dispatch(fetchStudentList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);

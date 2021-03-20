import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudentList } from '../store/studentList';
import ListNav from './ListNav.jsx';
import StudentCard from './StudentCard.jsx';

class StudentList extends Component {
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
            return <StudentCard key={student.id} student={student} />;
          })}
        </div>
        <ListNav page={page} maxPage={maxPage} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { studentList } = state;
  return { studentList };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchStudentList: dispatch(fetchStudentList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStudentList } from '../../store/student/studentList';
import ListNav from '../NavComponents/ListNav.jsx';
import StudentCard from './StudentCard.jsx';

class StudentList extends Component {
  componentDidMount() {
    this.props.fetchStudentList();
  }
  render() {
    const { studentList, history } = this.props;
    const { page } = this.props.match.params;
    const listSize = 20;
    const currList = studentList.slice(
      page * listSize,
      page * listSize + listSize
    );
    const maxPage = Math.ceil(studentList.length / listSize) - 1;
    return (
      <div>
        {studentList.length ? (
          <div className="list-parent">
            <h2>
              Student List
              <Link to="./add">
                <button>Add Student</button>
              </Link>
            </h2>
            <ListNav page={page} maxPage={maxPage} />
            <div className="student-list">
              {currList.map((student) => (
                <StudentCard
                  student={student}
                  history={history}
                  key={student.id}
                />
              ))}
            </div>
            <ListNav page={page} maxPage={maxPage} />
          </div>
        ) : (
          <div>
            <h2>Student List</h2>
            <p>There are no students registered</p>
            <button>Add Student</button>
          </div>
        )}
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

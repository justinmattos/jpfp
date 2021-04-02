import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCampusStudents } from '../../store/campus/campusStudents';
import { fetchStudentList } from '../../store/student/studentList';
import ListNav from '../NavComponents/ListNav.jsx';
import StudentCard from './StudentCard.jsx';

class StudentList extends Component {
  componentDidMount() {
    const {
      sort,
      page,
      size,
      campusId,
      fetchCampusStudents,
      fetchStudentList,
    } = this.props;
    if (campusId) {
      fetchCampusStudents({ campusId, sort, page, size });
    } else {
      fetchStudentList({ sort, page, size });
    }
  }
  componentDidUpdate({ page: prevPage, sort: prevSort }) {
    const {
      page,
      size,
      sort,
      campusId,
      fetchCampusStudents,
      fetchStudentList,
    } = this.props;
    console.log(prevPage, page, campusId);
    if (prevPage !== page || prevSort !== sort) {
      if (campusId) {
        fetchCampusStudents({ campusId, sort, page, size });
      } else {
        fetchStudentList({ sort, page, size });
      }
    }
  }
  prevPage = () => {
    const { page } = this.props;
    this.goToPage(page * 1 - 1);
  };
  nextPage = () => {
    const { page } = this.props;
    this.goToPage(page * 1 + 1);
  };
  goToPage = (newPage) => {
    const { size, sort, history, campusId } = this.props;
    if (campusId) {
      history.push(`/campus/${campusId}/${sort}/${newPage}/${size}`);
    } else {
      history.push(`/student/all/${sort}/${newPage}/${size}`);
    }
  };
  sortFunc = (sortType) => {
    const { history, campusId } = this.props;
    if (campusId) {
      history.push(`/campus/${campusId}/${sortType}/1/10`);
    } else {
      history.push(`/student/all/${sortType}/1/20`);
    }
  };
  render() {
    const {
      studentList: { currentList, maxPage },
      history,
      size,
      page,
      sort,
      campusId,
    } = this.props;
    const sortOption = sort === 'sortByName' ? 'sortByGPA' : 'sortByName';
    const sortLabel = sortOption.slice(6);
    const StudentListNav = () => {
      return (
        <ListNav
          page={page}
          maxPage={maxPage}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
          goToPage={this.goToPage}
          sortFunc={this.sortFunc}
          sortOption={sortOption}
          sortLabel={sortLabel}
        />
      );
    };
    return (
      <div>
        {currentList ? (
          <div className="list-parent">
            <h2>
              Student List
              <Link to="/student/add">
                <button>Add Student</button>
              </Link>
            </h2>
            <StudentListNav />
            <div className="student-list">
              {currentList.map((student) => (
                <StudentCard
                  student={student}
                  history={history}
                  campusId={campusId}
                  pageDetail={{ sort, page, size }}
                  key={student.studentId}
                />
              ))}
            </div>
            <StudentListNav />
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
  const { history, campusId } = ownProps;
  const { sort, page, size } = campusId ? ownProps : ownProps.match.params;
  return { studentList, history, page, size, sort, campusId };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchStudentList: ({ sort, page, size }) =>
      dispatch(fetchStudentList({ sort, page, size })),
    fetchCampusStudents: ({ campusId, sort, page, size }) =>
      dispatch(fetchCampusStudents({ campusId, sort, page, size })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);

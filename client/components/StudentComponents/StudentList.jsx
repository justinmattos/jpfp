import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCampusStudents } from '../../store/campus/campusStudents';
import {
  setPageDetail,
  nextPage,
  prevPage,
  goToPage,
  setSort,
} from '../../store/pageDetail';
import { fetchStudentList } from '../../store/student/studentList';
import ListNav from '../NavComponents/ListNav.jsx';
import StudentCard from './StudentCard.jsx';

class StudentList extends Component {
  componentDidMount() {
    const {
      setPageDetail,
      campusId,
      fetchCampusStudents,
      fetchStudentList,
    } = this.props;
    const initialPageDetail = { sort: 'sortByName', page: 1, size: 20 };
    if (campusId) {
      initialPageDetail.size = 10;
      fetchCampusStudents({ campusId, ...initialPageDetail });
    } else {
      fetchStudentList(initialPageDetail);
    }
    setPageDetail(initialPageDetail);
  }
  componentDidUpdate({ pageDetail: { page: prevPage, sort: prevSort } }) {
    const {
      pageDetail,
      campusId,
      fetchCampusStudents,
      fetchStudentList,
    } = this.props;
    const { page, sort } = pageDetail;
    if (prevPage !== page || prevSort !== sort) {
      if (campusId) {
        fetchCampusStudents({ campusId, ...pageDetail });
      } else {
        fetchStudentList(pageDetail);
      }
    }
  }
  render() {
    const {
      studentList,
      campusStudents,
      pageDetail: { size, page, sort },
      paginationFuncs: { nextPage, prevPage, goToPage, setSort },
      history,
      campusId,
    } = this.props;
    const { currentList, maxPage } = campusId ? campusStudents : studentList;
    const sortOption = sort === 'sortByName' ? 'sortByGPA' : 'sortByName';
    const sortLabel = sortOption.slice(6);
    const StudentListNav = () => {
      return (
        <ListNav
          page={page}
          maxPage={maxPage}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={goToPage}
          sortFunc={setSort}
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
  const { studentList, campusStudents, pageDetail } = state;
  const { history, campusId } = ownProps;
  return { studentList, campusStudents, pageDetail, history, campusId };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchStudentList: ({ sort, page, size }) =>
      dispatch(fetchStudentList({ sort, page, size })),
    fetchCampusStudents: ({ campusId, sort, page, size }) =>
      dispatch(fetchCampusStudents({ campusId, sort, page, size })),
    setPageDetail: ({ sort, page, size }) =>
      dispatch(setPageDetail({ sort, page, size })),
    paginationFuncs: {
      nextPage: () => dispatch(nextPage()),
      prevPage: () => dispatch(prevPage()),
      goToPage: (page) => dispatch(goToPage(page)),
      setSort: (sort) => dispatch(setSort(sort)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);

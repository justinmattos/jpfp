import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCampusDetail } from '../../store/campus/campusDetail';
import deleteCampus from '../../store/campus/deleteCampus';
import { fetchCampusStudents } from '../../store/campus/campusStudents';
import ListNav from '../NavComponents/ListNav.jsx';
import StudentCard from '../StudentComponents/StudentCard.jsx';
import StudentList from '../StudentComponents/StudentList.jsx';

class CampusDetail extends Component {
  componentDidMount() {
    const { campusId } = this.props;
    this.props.fetchCampusDetail(campusId);
  }
  componentDidUpdate({
    campusDetail: prevCampusDetail,
    campusId: prevCampusId,
  }) {
    const { campusId, campusDetail } = this.props;
    const check1 = campusDetail.students ? campusDetail.students.length : -1;
    const check2 = prevCampusDetail.students
      ? prevCampusDetail.students.length
      : -1;
    if (check1 !== check2 || campusId !== prevCampusId) {
      this.props.fetchCampusDetail(campusId);
    }
  }
  render() {
    const {
      campusDetail,
      history,
      deleteCampus,
      sort,
      page,
      size,
    } = this.props;
    const campusId = campusDetail.campusId || '';
    const name = campusDetail.name || 'Loading Campus . . . ';
    const imageURL = campusDetail.imageURL || '';
    const address = campusDetail.address || '';
    const description = campusDetail.description || '';
    const students = campusDetail.students || 0;
    return (
      <div>
        {campusDetail === '' ? (
          <div>
            <h2>Sorry, it seems that campus is not in the database</h2>
            <Link to="/campus/all">
              <button>Return to All Campuses</button>
            </Link>
          </div>
        ) : (
          <div className="campus-detail">
            <img className="campus-detail-img" src={imageURL} />
            <div className="campus-detail-info">
              <div>
                <h1>{name}</h1>
                <div className="campus-address">
                  {address.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
                <p className="campus-description">{description}</p>
              </div>
              <div>
                <Link to={`/campusList/campus/${campusDetail.id}/edit`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => deleteCampus(campusDetail.id, history)}>
                  Delete
                </button>
              </div>
            </div>
            <div className="campus-detail-list">
              {students ? (
                <StudentList campusId={campusId} history={history} />
              ) : (
                'This campus does not have any students'
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { campusDetail } = state;
  const {
    history,
    match: {
      params: { campusId },
    },
  } = ownProps;
  return { campusDetail, campusId, history };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    fetchCampusDetail: (campusId) => dispatch(fetchCampusDetail(campusId)),
    deleteCampus: (campusId) => dispatch(deleteCampus(campusId, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusDetail);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCampusDetail } from '../../store/campus/campusDetail';
import deleteCampus from '../../store/campus/deleteCampus';
import ListNav from '../NavComponents/ListNav.jsx';
import StudentCard from '../StudentComponents/StudentCard.jsx';

class CampusDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCampusDetail(id);
  }
  componentDidUpdate({ campusDetail: prevCampusDetail }) {
    const { id } = this.props.match.params;
    const { campusDetail } = this.props;
    const check1 = campusDetail.students.length;
    const check2 = prevCampusDetail.students
      ? prevCampusDetail.students.length
      : -1;
    if (check1 !== check2) {
      this.props.fetchCampusDetail(id);
    }
  }
  render() {
    const { campusDetail, history, deleteCampus } = this.props;
    const name = campusDetail.name || 'Loading Campus . . . ';
    const imageURL = campusDetail.imageURL || '';
    const address = campusDetail.address || '';
    const description = campusDetail.description || '';
    const students = campusDetail.students || [];
    const { page } = this.props.match.params;
    const listSize = 10;
    const currList = students.slice(
      page * listSize,
      page * listSize + listSize
    );
    const maxPage = Math.ceil(students.length / listSize) - 1;
    return (
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
          <div>
            {students.length ? (
              <div className="list-parent">
                <ListNav page={page} maxPage={maxPage} />
                <div className="student-list">
                  {currList.map((student) => (
                    <StudentCard
                      key={student.id}
                      history={history}
                      student={student}
                      campus={campusDetail}
                    />
                  ))}
                </div>
                <ListNav page={page} maxPage={maxPage} />
              </div>
            ) : (
              'This campus does not have any students'
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { campusDetail } = state;
  const { history } = ownProps;
  return { campusDetail, history };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    fetchCampusDetail: (id) => dispatch(fetchCampusDetail(id)),
    deleteCampus: (id) => dispatch(deleteCampus(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusDetail);

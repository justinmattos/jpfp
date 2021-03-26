import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampusDetail } from '../../store/campusDetail';
import ListNav from '../NavComponents/ListNav.jsx';
import StudentCard from '../StudentComponents/StudentCard.jsx';

class CampusDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCampusDetail(id);
  }
  render() {
    const { campusDetail } = this.props;
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
            <button>Edit</button>
            <button>Delete</button>
          </div>
          <div>
            {students.length
              ? 'This campus has students'
              : 'This campus does not have any students'}
          </div>
          {students.length ? (
            <div className="list-parent">
              <ListNav page={page} maxPage={maxPage} />
              <div className="student-list">
                {currList.map((student) => (
                  <StudentCard key={student.id} student={student} campus />
                ))}
              </div>
              <ListNav page={page} maxPage={maxPage} />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { campusDetail, studentList } = state;
  return { campusDetail, studentList };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCampusDetail: (id) => dispatch(fetchCampusDetail(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusDetail);

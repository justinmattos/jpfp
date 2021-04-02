import React, { Component } from 'react';
import { connect } from 'react-redux';
import deleteCampus from '../../store/campus/deleteCampus';

class CampusCard extends Component {
  linkToCampus = (ev) => {
    const {
      campus: { campusId },
      history,
    } = this.props;
    if (ev.target.tagName !== 'BUTTON') {
      history.push(`/campus/${campusId}/sortByName/1/10`);
    }
  };
  render() {
    const { campus, student, deleteCampus } = this.props;
    const { campusId, imageURL, name, students } = campus;
    return (
      <div className="campus-card-wrapper" onClick={this.linkToCampus}>
        <div className="campus-card">
          <img src={imageURL} />
          <div className="campus-card-detail">
            <div>
              <h4>{name}</h4>
              <h5>{students} Students</h5>
            </div>
            <div>
              {student ? (
                ''
              ) : (
                <button onClick={() => deleteCampus(campusId)}>Delete</button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { ...ownProps };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    pageDetail: { page, sort, size },
  } = ownProps;
  return {
    deleteCampus: (campusId) => {
      console.log('Deleting campus ', campusId);
      dispatch(deleteCampus({ campusId, sort, page, size }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusCard);

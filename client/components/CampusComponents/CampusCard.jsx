import React, { Component } from 'react';
import { connect } from 'react-redux';
import deleteCampus from '../utils/deleteCampus';

class CampusCard extends Component {
  linkToCampus = (ev) => {
    const { campus, history } = this.props;
    if (ev.target.tagName !== 'BUTTON') {
      history.push(`/campus/${campus.id}?page=0&size=20&sort=lastName`);
    }
  };
  render() {
    const { campus, student, deleteCampus } = this.props;
    const students = campus.students || '';
    return (
      <div className="campus-card-wrapper" onClick={this.linkToCampus}>
        <div className="campus-card">
          <img src={campus.imageURL} />
          <div className="campus-card-detail">
            <div>
              <h4>{campus.name}</h4>
              <h5>{students.length} Students</h5>
            </div>
            <div>
              {student ? (
                ''
              ) : (
                <button onClick={() => deleteCampus(campus.id)}>Delete</button>
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
  const { history } = ownProps;
  return {
    deleteCampus: (id) => {
      dispatch(deleteCampus(id, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusCard);

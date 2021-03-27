import React, { Component } from 'react';
import { connect } from 'react-redux';
import deleteCampus from '../../store/deleteCampus';

class CampusCard extends Component {
  linkToCampus = (ev) => {
    const { campus, history } = this.props;
    if (ev.target.tagName !== 'BUTTON') {
      history.push(`/campusList/campus/${campus.id}/0`);
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
              {student ? '' : <h5>{students.length} Students</h5>}
            </div>
            <div>
              <button onClick={() => deleteCampus(campus.id)}>Delete</button>
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
      history.push('/campusList/0');
      dispatch(deleteCampus(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusCard);

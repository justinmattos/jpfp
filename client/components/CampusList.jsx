import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampusList } from '../store/campusList';
import ListNav from './ListNav.jsx';

class CampusList extends Component {
  render() {
    const { campusList } = this.props;
    const { page } = this.props.match.params;
    const currList = campusList.slice(page * 10, page * 10 + 10);
    const maxPage = Math.ceil(campusList.length / 10) - 1;
    return (
      <div>
        <h2>Campus List</h2>
        <ListNav page={page} maxPage={maxPage} />
        {currList.map((campus) => {
          return (
            <p key={campus.id}>
              <img src={campus.imageURL}></img>
              {campus.name}
            </p>
          );
        })}
        <ListNav page={page} maxPage={maxPage} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { campusList } = state;
  return { campusList };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCampusList: dispatch(fetchCampusList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusList);

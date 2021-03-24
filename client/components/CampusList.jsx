import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampusList } from '../store/campusList';
import ListNav from './ListNav.jsx';
import CampusCard from './CampusCard.jsx';

class CampusList extends Component {
  componentDidMount() {
    this.props.fetchCampusList();
  }
  render() {
    const { campusList } = this.props;
    const { page } = this.props.match.params;
    const currList = campusList.slice(page * 10, page * 10 + 10);
    const maxPage = Math.ceil(campusList.length / 10) - 1;
    return (
      <div className="list-parent">
        <h2>Campus List</h2>
        <ListNav page={page} maxPage={maxPage} />
        <div className="campus-list">
          {currList.map((campus) => {
            return <CampusCard campus={campus} key={campus.id} />;
          })}
        </div>
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
    fetchCampusList: () => dispatch(fetchCampusList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusList);

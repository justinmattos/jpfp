import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import campusList, { fetchCampusList } from '../../store/campus/campusList';
import ListNav from '../NavComponents/ListNav.jsx';
import CampusCard from './CampusCard.jsx';

class CampusList extends Component {
  componentDidMount() {
    const { page, size, sort } = this.props;
    this.props.fetchCampusList({ page, size, sort });
  }
  componentDidUpdate({ page: prevPage }) {
    const { page, size, sort } = this.props;
    if (prevPage !== page) {
      this.props.fetchCampusList({ page, size, sort });
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
    const { size, sort, history } = this.props;
    history.push(`/campus/all/${newPage}/${size}/${sort}`);
  };
  sortFunc = (sortType) => {};
  render() {
    const {
      campusList: { currentList, maxPage },
      history,
      page,
    } = this.props;
    const CampusListNav = () => {
      return (
        <ListNav
          page={page}
          maxPage={maxPage}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
          goToPage={this.goToPage}
          sortFunc={this.sortFunc}
          sortType1="Name"
          sortType2="Students"
        />
      );
    };
    return (
      <div>
        {currentList ? (
          <div className="list-parent">
            <h2>
              Campus List
              <Link to="./add">
                <button>Add Campus</button>
              </Link>
            </h2>
            <CampusListNav />
            <div className="campus-list">
              {currentList.map((campus) => {
                return (
                  <CampusCard
                    campus={campus}
                    history={history}
                    key={campus.campusId}
                  />
                );
              })}
            </div>
            <CampusListNav />
          </div>
        ) : (
          <div>
            <h2>Campus List</h2>
            <p>There are no campuses in the database</p>
            <button>Add Campus</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { campusList } = state;
  const { history } = ownProps;
  const { page, size, sort } = ownProps.match.params;
  return { campusList, history, page, size, sort };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCampusList: ({ page, size, sort }) =>
      dispatch(fetchCampusList({ page, size, sort })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusList);

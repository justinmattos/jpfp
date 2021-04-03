import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCampusList } from '../../store/campus/campusList';
import {
  setPageDetail,
  nextPage,
  prevPage,
  goToPage,
  setSort,
} from '../../store/pageDetail';
import ListNav from '../NavComponents/ListNav.jsx';
import CampusCard from './CampusCard.jsx';

class CampusList extends Component {
  componentDidMount() {
    const {
      setPageDetail,
      fetchCampusList,
      pageDetail: { sort, page, size },
    } = this.props;
    const initialPageDetail = {
      sort: sort || 'sortByName',
      page: page || 1,
      size: size || 10,
    };
    fetchCampusList(initialPageDetail);
    setPageDetail(initialPageDetail);
  }
  componentDidUpdate({ pageDetail: { page: prevPage, sort: prevSort } }) {
    const { pageDetail, fetchCampusList } = this.props;
    const { page, sort } = pageDetail;
    if (prevPage !== page || prevSort !== sort) {
      fetchCampusList(pageDetail);
    }
  }
  render() {
    const {
      campusList: { currentList, maxPage },
      history,
      pageDetail: { page, sort, size },
      paginationFuncs: { nextPage, prevPage, goToPage, setSort },
    } = this.props;
    const sortOption = sort === 'sortByName' ? 'sortByStudents' : 'sortByName';
    const sortLabel = sortOption.slice(6);
    const CampusListNav = () => {
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
              Campus List
              <Link to="/campus/add">
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
                    pageDetail={{ sort, page, size }}
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

const mapStateToProps = ({ campusList, pageDetail }, { history }) => ({
  campusList,
  pageDetail,
  history,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCampusList: ({ page, size, sort }) =>
    dispatch(fetchCampusList({ page, size, sort })),
  setPageDetail: ({ page, size, sort }) =>
    dispatch(setPageDetail({ page, size, sort })),
  paginationFuncs: {
    nextPage: () => dispatch(nextPage()),
    prevPage: () => dispatch(prevPage()),
    goToPage: (page) => dispatch(goToPage(page)),
    setSort: (sort) => dispatch(setSort(sort)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampusList);

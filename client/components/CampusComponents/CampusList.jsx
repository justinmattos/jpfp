import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCampusList } from '../../store/campus/campusList';
import ListNav from '../NavComponents/ListNav.jsx';
import CampusCard from './CampusCard.jsx';

class CampusList extends Component {
  componentDidMount() {
    this.props.fetchCampusList();
  }
  render() {
    const { campusList, history } = this.props;
    const { page } = this.props.match.params;
    const currList = campusList.slice(page * 10, page * 10 + 10);
    const maxPage = Math.ceil(campusList.length / 10) - 1;
    return (
      <div>
        {campusList.length ? (
          <div className="list-parent">
            <h2>
              Campus List
              <Link to="./add">
                <button>Add Campus</button>
              </Link>
            </h2>
            <ListNav page={page} maxPage={maxPage} />
            <div className="campus-list">
              {currList.map((campus) => {
                return (
                  <CampusCard
                    campus={campus}
                    history={history}
                    key={campus.id}
                  />
                );
              })}
            </div>
            <ListNav page={page} maxPage={maxPage} />
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
  return { campusList, history };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCampusList: () => dispatch(fetchCampusList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusList);

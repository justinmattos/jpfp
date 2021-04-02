import React from 'react';
import { Link } from 'react-router-dom';

const ListNav = ({
  page,
  maxPage,
  prevPage,
  nextPage,
  goToPage,
  sortFunc,
  sortOption,
  sortLabel,
}) => {
  return (
    <div className="list-nav">
      <div>
        {page * 1 > 1 ? (
          <div className="list-back">
            <a onClick={() => goToPage(1)}>First</a>
            <a onClick={prevPage}>Previous</a>
          </div>
        ) : (
          <div className="list-back inactive">
            <a>First</a>
            <a>Previous</a>
          </div>
        )}
      </div>
      <div>
        <label>
          <p>Page: </p>
          <input
            type="number"
            min="1"
            max={maxPage}
            step="1"
            defaultValue={page}
          ></input>
          <button
            className="pagination-button"
            onClick={(ev) => {
              goToPage(ev.target.parentNode.children[1].value);
            }}
          >
            Go
          </button>
        </label>
      </div>
      <div>
        <button
          className="pagination-button"
          onClick={() => sortFunc(sortOption)}
        >
          Sort By {sortLabel}
        </button>
      </div>
      <div>
        {page * 1 < maxPage ? (
          <div className="list-fwrd">
            <a onClick={() => goToPage(maxPage)}>Last</a>
            <a onClick={nextPage}>Next</a>
          </div>
        ) : (
          <div className="list-fwrd inactive">
            <a>Last</a>
            <a>Next</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListNav;

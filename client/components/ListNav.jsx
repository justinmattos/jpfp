import React from 'react';
import { Link } from 'react-router-dom';

const ListNav = ({ page, maxPage }) => {
  return (
    <div className="list-nav">
      <div>
        {page * 1 > 0 ? (
          <div className="list-back">
            <Link to="./0">First</Link>
            <Link to={`./${page * 1 - 1}`}>Previous</Link>
          </div>
        ) : (
          ''
        )}
      </div>
      <div>
        {page * 1 < maxPage ? (
          <div className="list-fwrd">
            <Link to={`./${maxPage}`}>Last</Link>
            <Link to={`./${page * 1 + 1}`}>Next</Link>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ListNav;

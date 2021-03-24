import React from 'react';
import { Link } from 'react-router-dom';

const CampusCard = ({ campus }) => {
  const students = campus.students || '';
  return (
    <div className="campus-card-wrapper">
      <Link to={`/campusList/campus/${campus.id}/0`}>
        <div className="campus-card">
          <img src={campus.imageURL} />
          <div className="campus-card-detail">
            <div>
              <h4>{campus.name}</h4>
              <h5>{students.length} Students</h5>
            </div>
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CampusCard;

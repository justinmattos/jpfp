import React from 'react';

const CampusCard = ({ campus }) => {
  return (
    <div className="campus-card">
      <img src={campus.imageURL} />
      <div className="campus-card-detail">
        <div>
          <h4>{campus.name}</h4>
          <h5>{campus.students.length} Students</h5>
        </div>
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CampusCard;

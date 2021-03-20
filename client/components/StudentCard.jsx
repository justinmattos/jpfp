import React from 'react';

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <img src={student.imageURL} />
      <h4>{student.name}</h4>
      <h5>{student.campus.name}</h5>
    </div>
  );
};

export default StudentCard;

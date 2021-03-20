import React from 'react';

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <img src={student.imageURL} />
      <p>{student.name}</p>
    </div>
  );
};

export default StudentCard;

import React from 'react';
import { Link } from 'react-router-dom';

const StudentCard = ({ student, campus }) => {
  const campusName = student.campus ? student.campus.name : '';
  return (
    <div className="student-card-wrapper">
      <Link to={`/studentList/student/${student.id}`}>
        <div className="student-card">
          <img src={student.imageURL} />
          <h4>{student.fullName}</h4>
          {campus ? '' : <h5>{campusName}</h5>}
        </div>
      </Link>
    </div>
  );
};

export default StudentCard;

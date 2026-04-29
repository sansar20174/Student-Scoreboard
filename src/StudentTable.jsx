import React from "react";
import StudentRow from "./StudentRow";

function StudentTable({ students, onScoreChange, onDelete, onSort, sortConfig }) {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => onSort("name")}
              className="sortable-button"
            >
              <span>Name</span>
              <span aria-hidden="true">{getSortIcon("name")}</span>
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => onSort("score")}
              className="sortable-button"
            >
              <span>Score</span>
              <span aria-hidden="true">{getSortIcon("score")}</span>
            </button>
          </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length ? (
          students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              onScoreChange={onScoreChange}
              onDelete={onDelete}
            />
          ))
        ) : (
          <tr>
            <td colSpan="4" className="empty-state">
              No students found. Try another search or add a new student.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default StudentTable;

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
          <th onClick={() => onSort("name")} className="sortable">
            Name {getSortIcon("name")}
          </th>
          <th onClick={() => onSort("score")} className="sortable">
            Score {getSortIcon("score")}
          </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length > 0 ? (
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
            <td colSpan="4" style={{ textAlign: "center", padding: "2rem" }}>
              No students found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default StudentTable;

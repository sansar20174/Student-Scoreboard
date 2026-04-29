import React from "react";

const StudentRow = React.memo(({ student, onScoreChange, onDelete }) => {
  const { id, name, score } = student;
  const isPassing = score >= 40;
  const status = isPassing ? "Pass" : "Fail";
  const statusClass = isPassing ? "status-pass" : "status-fail";

  const handleChange = (e) => {
    const value = e.target.value;

    // Let the field clear briefly while the user edits the score.
    if (value === "") {
      onScoreChange(id, 0);
      return;
    }

    const nextScore = Number(value);
    if (!isNaN(nextScore)) {
      onScoreChange(id, nextScore);
    }
  };

  return (
    <tr className="student-row">
      <td>{name}</td>
      <td>
        <input
          type="number"
          value={score}
          min="0"
          max="100"
          onChange={handleChange}
          className="score-input"
        />
      </td>
      <td className={statusClass}>{status}</td>
      <td>
        <button type="button" className="btn-delete" onClick={() => onDelete(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
});

export default StudentRow;

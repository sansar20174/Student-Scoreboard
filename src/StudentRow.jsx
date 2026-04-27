import React from "react";

const StudentRow = React.memo(({ student, onScoreChange, onDelete }) => {
  const { id, name, score } = student;
  const status = score >= 40 ? "Pass" : "Fail";
  const statusClass = score >= 40 ? "status-pass" : "status-fail";

  const handleChange = (e) => {
    const value = e.target.value;
    // Empty string check allows user to delete the number to type a new one
    if (value === "") {
      onScoreChange(id, 0);
      return;
    }
    
    const newScore = Number(value);
    if (!isNaN(newScore)) {
      onScoreChange(id, newScore);
    }
  };

  return (
    <tr>
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
        <button className="btn-delete" onClick={() => onDelete(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
});

export default StudentRow;

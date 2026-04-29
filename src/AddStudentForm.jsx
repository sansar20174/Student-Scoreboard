import React, { useState } from "react";

function AddStudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter a student name.");
      return;
    }

    const numScore = Number(score);
    if (isNaN(numScore) || numScore < 0 || numScore > 100) {
      setError("Score must be between 0 and 100.");
      return;
    }

    setError("");
    onAdd(name.trim(), numScore);
    setName("");
    setScore("");
  };

  return (
    <form className="add-student-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field-group">
          <span>Student name</span>
          <input
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
          />
        </label>

        <label className="field-group">
          <span>Score</span>
          <input
            type="number"
            placeholder="0 - 100"
            value={score}
            min="0"
            max="100"
            onChange={(e) => setScore(e.target.value)}
          />
        </label>

        <button type="submit">Add Student</button>
      </div>

      {error ? <p className="form-feedback">{error}</p> : null}
    </form>
  );
}

export default AddStudentForm;
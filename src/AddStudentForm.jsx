import React, { useState } from "react";

function AddStudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      alert("Please enter a student name.");
      return;
    }
    
    const numScore = Number(score);
    if (isNaN(numScore) || numScore < 0 || numScore > 100) {
      alert("Score must be between 0 and 100.");
      return;
    }

    onAdd(name.trim(), numScore);
    setName("");
    setScore("");
  };

  return (
    <form className="add-student-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={30}
      />
      <input
        type="number"
        placeholder="Score"
        value={score}
        min="0"
        max="100"
        onChange={(e) => setScore(e.target.value)}
      />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudentForm;

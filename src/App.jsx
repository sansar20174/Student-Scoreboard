import React, { useState, useMemo } from "react";
import Header from "./Header";
import StudentTable from "./StudentTable";
import AddStudentForm from "./AddStudentForm";
import "./styles.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Alice", score: 75 },
    { id: 2, name: "Bob", score: 35 },
    { id: 3, name: "Charlie", score: 50 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  const addStudent = (name, score) => {
    const newStudent = {
      id: Date.now(),
      name,
      score: Number(score),
    };
    setStudents((prev) => [...prev, newStudent]);
  };

  const updateScore = (id, newScore) => {
    // Basic validation: ensure score is between 0 and 100
    const validatedScore = Math.max(0, Math.min(100, Number(newScore)));
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: validatedScore } : s))
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedStudents = useMemo(() => {
    let result = [...students];

    // Filter
    if (searchTerm) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [students, searchTerm, sortConfig]);

  return (
    <div className="app-container">
      <Header title="Student Scoreboard" />
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search students by name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <StudentTable
        students={filteredAndSortedStudents}
        onScoreChange={updateScore}
        onDelete={deleteStudent}
        onSort={handleSort}
        sortConfig={sortConfig}
      />
      <AddStudentForm onAdd={addStudent} />
    </div>
  );
}

export default App;

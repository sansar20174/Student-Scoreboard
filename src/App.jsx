import React, { useState, useMemo } from "react";
import Header from "./Header";
import StudentTable from "./StudentTable";
import AddStudentForm from "./AddStudentForm";
import "./styles.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Alice", score: 75 },
    { id: 2, name: "Bob", score: 35 },
    { id: 4, name: "Diana", score: 88 },
    { id: 6, name: "Fiona", score: 67 },
    { id: 7, name: "George", score: 34 },
    { id: 8, name: "Hannah", score: 79 },
    { id: 9, name: "Ibrahim", score: 14 },
    { id: 10, name: "Jasmine", score: 99 },
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

  const statistics = useMemo(() => {
    const total = filteredAndSortedStudents.length;
    const scoreValues = filteredAndSortedStudents.map((student) => student.score);
    const scoreSum = scoreValues.reduce((sum, score) => sum + score, 0);
    const average = total ? Math.round((scoreSum / total) * 100) / 100 : 0;
    const highest = total ? Math.max(...scoreValues) : 0;
    const lowest = total ? Math.min(...scoreValues) : 0;

    return {
      total,
      average,
      highest,
      lowest,
      averageLabel: total ? average.toFixed(2) : "0.00",
      highestLabel: total ? String(highest) : "—",
      lowestLabel: total ? String(lowest) : "—",
    };
  }, [filteredAndSortedStudents]);

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

      <section className="hero-panel">
        <div className="hero-copy">
          <h2>Score summary</h2>
          <p>
            View overall performance metrics for the current student list, including average, highest, and lowest scores.
          </p>
        </div>
        <div className="metrics-grid">
          <div className="metric-card metric-card-primary">
            <div className="metric-label">Total students</div>
            <strong>{statistics.total}</strong>
          </div>
          <div className="metric-card metric-card-primary">
            <div className="metric-label">Average score</div>
            <strong>{statistics.averageLabel}</strong>
          </div>
          <div className="metric-card metric-card-pass">
            <div className="metric-label">Highest score</div>
            <strong>{statistics.highestLabel}</strong>
          </div>
          <div className="metric-card metric-card-fail">
            <div className="metric-label">Lowest score</div>
            <strong>{statistics.lowestLabel}</strong>
          </div>
        </div>
      </section>

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

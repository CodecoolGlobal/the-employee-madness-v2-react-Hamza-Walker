import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete }) => {
  const [positionFilter, setPositionFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  // Filter employees based on the selected position and level options
  const filteredEmployees = employees.filter((employee) => {
    const positionMatch = positionFilter ? employee.position === positionFilter : true;
    const levelMatch = levelFilter ? employee.level === levelFilter : true;
    const searchMatch = searchFilter ? employee.name.toLowerCase().includes(searchFilter.toLowerCase()) : true;
    return positionMatch && levelMatch && searchMatch;
  });

  // Get unique values for Position and Level dropdown menus
  const positions = Array.from(new Set(employees.map((employee) => employee.position)));
  const levels = Array.from(new Set(employees.map((employee) => employee.level)));

  return (
    <div className="EmployeeTable">
      <div className="filters">
        <label>
          Position:
          <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
            <option value="">All</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </label>
        <label>
          Level:
          <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
            <option value="">All</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>
        <label>
          Search:
          <input type="text" value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

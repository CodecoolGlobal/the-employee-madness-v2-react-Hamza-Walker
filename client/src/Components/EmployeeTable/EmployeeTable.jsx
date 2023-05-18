import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterLevel, setFilterLevel] = useState("");

  const handleFilter = (e) => {
    setFilterLevel(e.target.value);
  };

  const filterEmployees = (employees) => {
    return employees.filter((employee) => {
      return employee.level.level.toLowerCase().includes(filterLevel.toLowerCase());
    });
  };

  const sortEmployees = (employees) => {
    if (sortOrder === "asc") {
      return employees.sort((a, b) => a.level.order - b.level.order);
    } else {
      return employees.sort((a, b) => b.level.order - a.level.order);
    }
  };

  const filteredAndSortedEmployees = sortEmployees(filterEmployees(employees));

  return (
    <div className="EmployeeTable">
      <div>
        <input
          type="text"
          placeholder="Filter by level"
          value={filterLevel}
          onChange={handleFilter}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>
              Level
              <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                {sortOrder === "asc" ? "▲" : "▼"}
              </button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.position}</td>
              <td>{employee.level.level}</td>
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

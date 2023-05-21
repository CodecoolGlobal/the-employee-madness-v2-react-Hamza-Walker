import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedEmployees = (employees) => {
      if (sortOrder === 'asc') {
        return employees.sort((a, b) => a.level.order - b.level.order)
      } else {
        return employees.sort((a, b) =>  b.level.order - a.level.order)
      }
  };

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>
              Level
              <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                {sortOrder === "asc" ? "▲" : "▼"}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees(employees).map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.level.order}</td>
                <td>
                  <Link to={`/update/${employee._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
         }
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

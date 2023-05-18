import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete }) => {
      const [sortOrder, setSortOrder] = useState("asc");
  
      const sortEmployees = (employees) => {
        if (sortOrder === "asc") {
          return employees.sort((a, b) => a.level.order - b.level.order);
        } else {
          return employees.sort((a, b) => b.level.order - a.level.order);
        }
      };
      


  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Level
            <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                {sortOrder === "asc" ? "▲" : "▼"}
              </button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortEmployees(employees).map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.position}</td>
               <td>{employee.level.level}</td>  {/* <== Update this line */}
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

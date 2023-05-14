import React, { useState } from 'react';

const EmployeeSearch = ({ employees }) => {
  const [position, setPosition] = useState('');

  const filteredEmployees = employees.filter((employee) => {
    const positionMatch = position ? employee.position === position : true;
    return positionMatch;
  });

    const handleUpdateEmployee = (employee) => {
        return fetch(`/api/employees/${employee._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
        }).then((res) => res.json());
    };


  return (
    <div>
      <h1>Search Employees by Position</h1>
      {/* Input field for employee position */}
      <label htmlFor="position-input">Employee position</label>
      <input
        type="text"
        id="position-input"
        value={position}
        onChange={(e) => {
          setPosition(e.target.value);
        }}
      />
      <div className="EmployeeTable">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>
                  <input
                    type="text"
                    defaultValue={employee.position}
                    onChange={(e) => {
                      // create a new employee object with updated position field
                      const updatedEmployee = { ...employee, position: e.target.value };
                      // TODO: handle updating the employee in the database
                      handleUpdateEmployee(updatedEmployee);
                    }}
                  />
                </td>
                <td>{employee.level}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeSearch;

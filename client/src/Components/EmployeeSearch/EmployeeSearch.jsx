import React, { useState } from 'react';

const EmployeeSearch = ({ employees }) => {
  const [filterValue, setFilterValue] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleFilterEmployees = () => {
    const filtered = employees.filter((employee) =>
      (employee.firstName + ' ' + employee.lastName)
        .toLowerCase()
        .startsWith(filterValue.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };
  const handleSimilarEmployees = (employeeId) => {
    const selectedEmployee = employees.find((employee) => employee.id === employeeId);
    if (selectedEmployee) {
      const similarEmployees = employees.filter(
        (employee) =>
          employee.level === selectedEmployee.level &&
          employee.position === selectedEmployee.position
      );
      setFilteredEmployees(similarEmployees);
    }
  };

  const displayedEmployees = filterValue ? filteredEmployees : employees;

  return (
    <>
      <div>
        <label htmlFor="employeeName">Employee Name:</label>
        <input
          type="text"
          id="employeeName"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <button onClick={handleFilterEmployees}>Filter</button>
      </div>

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
          {displayedEmployees.map((employee) => (
  <tr key={employee._id}>
    <td>{employee.firstName}</td>
    <td>{employee.lastName}</td>
    <td>{employee.position}</td>
    <td>{employee.level}</td>
    <td>
      <button onClick={() => handleSimilarEmployees(employee.id)}>
        Similar Employees
      </button>
    </td>
  </tr>
))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeSearch;

import React, { useState, useEffect } from 'react';
import Loading from '../Components/Loading';

const fetchEmployees = () => {
  return fetch("/api/employees").then(res => res.json());
};

const EmployeeSearchPage = () => {
  const [inputName, setInputName] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarEmployee, setSimilarEmployee] = useState(null);

  const filteredEmployees = employees.filter(employee => {
    return employee.name.toLowerCase().includes(inputName.toLowerCase());
  });

   const similarPositionAndLevel = similarEmployee ? filteredEmployees.filter(emp => {
    return (
        emp.position === similarEmployee.position &&
        emp.level === similarEmployee.level
    );
    }) : filteredEmployees

  

  useEffect(() => {
    fetchEmployees()
      .then(employees => {
        setLoading(false);
        setEmployees(employees);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Employee Name"
        value={inputName}
        onChange={e => setInputName(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {similarPositionAndLevel.map(employee => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.level}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    setSimilarEmployee(employee);
                  }}
                >
                  Similar Employee
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeSearchPage;

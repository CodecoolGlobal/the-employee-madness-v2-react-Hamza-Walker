import React, { useState, useEffect } from 'react';
import Loading from "../Components/Loading";
import { useNavigate } from 'react-router-dom';

const fetchEmployees = () => {
  return fetch("/api/employees")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching employees");
      }
      return res.json();
    });
};

const YearsOfExperience = () => {
  const currentUrl = window.location.href;
  const parts = currentUrl.split('/');
  const lastSegment = parts.pop();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
        setEmployees([]);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const filteredEmployees = employees.filter((employee) => {
    return employee.experience >= lastSegment;
  });

  // Check if there are no filtered employees and navigate to a 404 page
  if (filteredEmployees.length === 0) {
    navigate('/404');
    return null;
  }

  return (
    <>
      <div>YearsOfExperience {lastSegment}</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Years of Experience</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.experience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default YearsOfExperience;

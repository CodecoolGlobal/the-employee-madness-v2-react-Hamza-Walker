import React, { useState, useEffect } from 'react';
import Loading from '../Components/Loading';
import { useParams } from 'react-router-dom';

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const PossitionPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputPosition, setInputPosition] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const { id } = useParams();

  const updateEmployee = (id) => {
    const employee = employees.find((employee) => employee._id === id);
    employee.position = newPosition;
    fetch(`/api/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setEmployees(employees);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  const filteredEmployees = employees.filter((employee) => {
    return employee.position.toLowerCase().includes(inputPosition.toLowerCase());
  });

  return (
    <>
      {employees && (
        <div>
          PossitionPage
          <input
            type="text"
            placeholder="Search"
            value={inputPosition}
            onChange={(e) => {
              setInputPosition(e.target.value);
              console.log(e.target.value);
            }}
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
              {filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Search"
                      defaultValue={employee.position}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setNewPosition(e.target.value);
                          console.log(e.target.value);
                          updateEmployee(employee._id);
                        }
                      }}
                    />
                  </td>
                  <td>{employee.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default PossitionPage;

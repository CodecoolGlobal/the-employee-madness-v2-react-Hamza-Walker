import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = async () => {
  return fetch("/api/employees")
    .then((res) => res.json());
};

const updateEmployee = async (id, updatedEmployee) => {
  return fetch(`/api/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEmployee),
  }).then((res) => res.json());
};

const deleteEmployee = async (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [filterHeight, setFilterHeight] = useState("");

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((prevEmployees) => {
      return prevEmployees.filter((employee) => employee._id !== id);
    });
  };

  const handleRandomizeHeight = () => {
    const updatedEmployees = employees.map((employee) => {
      const randomHeight = Math.floor(Math.random() * (190 - 140 + 1)) + 140;
      return { ...employee, height: randomHeight };
    });

    Promise.all(
      updatedEmployees.map((employee) =>
        updateEmployee(employee._id, { height: employee.height })
      )
    )
      .then(() => {
        setEmployees(updatedEmployees);
      })
      .catch((error) => {
        console.error("Error updating employees:", error);
      });
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        if (filterHeight) {
          const filteredEmployees = employees.filter(
            (employee) => employee.height > filterHeight
          );
          setEmployees(filteredEmployees);
        } else {
          setEmployees(employees);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, [filterHeight]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <input
        type="number"
        placeholder="Filter by height"
        value={filterHeight}
        onChange={(e) => setFilterHeight(e.target.value)}
      />
      <button onClick={handleRandomizeHeight}>Randomize Height</button>
      <EmployeeTable employees={employees} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeList;

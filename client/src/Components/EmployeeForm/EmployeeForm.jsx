
import React, { useState,useEffect } from "react";
import Loading from "../Loading";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};
const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
 
  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        previousCompany: { name: selectedCompany }, // Save the selected company
      });
    }
    return onSave({
      name,
      level,
      position,
      previousCompany: { name: selectedCompany }, // Save the selected company
    });
  };
  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }
  const companies = Array.from(
    new Set(employees.map((emp) => emp.previousCompnay.name))
  );

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>
      <div className="previous-company">
        <label htmlFor="previousCompany">Previous Company:</label>
        <select
          name="previousCompany"
          id="previousCompany"
          onChange={(e) => {
            setSelectedCompany(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="">Select a company</option>
          {companies.map((companyName) => (
            <option key={companyName} value={companyName}>
              {companyName}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};


export default EmployeeForm;

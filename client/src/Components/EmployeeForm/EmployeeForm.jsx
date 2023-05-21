import { useState,useEffect } from "react";
const fetchEmployees = async () => {
  return await fetch("/api/employees");
};  
const fetchCompanies = async () => {
  return await fetch("/api/companies");
};

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [company, setCompany] = useState(employee?.company?.name ?? "");
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const selectedCompany = companies.find((com) => com.name === company);

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        company:  selectedCompany._id, // Save the selected company
      });
    }
    return onSave({
      name,
      level,
      position,
      company: selectedCompany._id, // Save the selected company
    });
  };

  
  
  
  
  useEffect(() => {
    fetchEmployees().then((res) => res.json()).then((data) => setEmployees(data));
    fetchCompanies().then((res) => res.json()).then((data) => setCompanies(data));
  }, []);

  const companyNames = new Set( employees.map(employee => employee.company.name));
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
      <div className="control">
        <label htmlFor="Company">Company:</label>
        <select value={company} onChange={(e) => setCompany(e.target.value)}>
          {Array.from(companyNames).map((companyName) => (
            <option key={companyName} value={companyName}>
              {companyName}
            </option>
          ))}
        </select>
      </div>


      <div className="buttons">
        <button type="submit" disabled={disabled} >
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

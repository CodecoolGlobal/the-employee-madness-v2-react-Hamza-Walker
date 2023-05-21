import { useState } from "react";
import useParams from "react-router-dom";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [experience, setExperience] = useState(employee?.experience ?? "");
  const experienceYears = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
      });
    }

    return onSave({
      name,
      level,
      position,
    });
  };

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
        <label htmlFor="Experience">Experience:</label>
        { level != "Junior" && (<select name="experience" defaultValue = {experience}>
          {experienceYears.map((experience) => (
            <option key={experience} value={"0"} onChange={ (e) => {
              setExperience(e.target.value)
              console.log(experience)
            }}>
              {experience}
            </option>
          ))}
        </select>)}
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

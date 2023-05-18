import { useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [Experience, setExperience] = useState(employee?.Experience ?? ""); 

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
          onChange={(e) => {
            console.log(e.target.value);
            setPosition(e.target.value)
          }
          }
          name="position"
          id="position"
        />
      </div>

      <div className="experience">
        {position !== "Junior" && position != "junior" && (
          <>
            <label htmlFor="Experience">Experience:</label>
            <input 
            defaultValue={0}
              onChange={(e) => setExperience(e.target.value)}
              name="Experience"
              id="Experience"
            />
          </>
        )}
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

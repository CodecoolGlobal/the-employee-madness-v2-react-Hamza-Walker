import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import EquipmentTable from "../Equipment/EquipmentTable";
import { useNavigate } from "react-router-dom";


const EmployeeTable = ({ employees, onDelete }) => {
  const navigate = useNavigate();

  const [positionFilter, setPositionFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [sorting , setSorting] = useState({ criteria : 'firstName', order : 'asc' });
  const [equipments, setEquipments] = useState([
    { id: 1, name: 'Laptop', type: 'Electronic', amount: 10 },
    { id: 2, name: 'Desk', type: 'Furniture', amount: 5 },
    { id: 3, name: 'Chair', type: 'Furniture', amount: 20 },
  ]);
  
  const updateEquipment = (updatedEquipment) => {
    const updatedEquipments = equipments.map((equipment) => {
      if (equipment.id === updatedEquipment.id) {
        return updatedEquipment;
      }
      return equipment;
    });
    setEquipments(updatedEquipments);
  };

  const deleteEquipment = (id) => {
    const updatedEquipments = equipments.filter((equipment) => equipment.id !== id);
    setEquipments(updatedEquipments);
  };

  const hadleSortingClick = (criteria) => {
    if (criteria === sorting.criteria) {
      setSorting({ ...sorting, order: sorting.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSorting({ criteria, order: 'asc' });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/employees/${searchFilter}`);
    }
  };
  


  // Filter employees based on the selected position and level options
  const filteredEmployees = employees.filter((employee) => {
    const positionMatch = positionFilter ? employee.position === positionFilter : true;
    const levelMatch = levelFilter ? employee.level === levelFilter : true;
    const searchMatch = searchFilter
    ? `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchFilter.toLowerCase())
    : true;
    return positionMatch && levelMatch && searchMatch;
  });
  const sortedEmployees = filteredEmployees.sort((a, b) => {
    const order = sorting.order === 'asc' ? 1 : -1;
  
    if (sorting.criteria === 'firstName') {
      return order * a.firstName.localeCompare(b.firstName)
    } else if (sorting.criteria === 'lastName') {
      return order * a.lastName.localeCompare(b.lastName)
    } else if (sorting.criteria === 'position') {
      return order * a.position.localeCompare(b.position)
    } else if (sorting.criteria === 'level') {
      return order * (a.level - b.level)
    }
    return 0;
  });

  // Get unique values for Position and Level dropdown menus
  const positions = Array.from(new Set(employees.map((employee) => employee.position)));
  const levels = Array.from(new Set(employees.map((employee) => employee.level)));

  return (
    <div className="EmployeeTable">
      <div className="filters">
        <label>
          Position:
          <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
            <option value="">All</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </label>
        <label>
          Level:
          <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
            <option value="">All</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>
        <label>
          Search:
          <input
            type="text" 
            value={searchFilter}
            onChange={(e) => {
              setSearchFilter(e.target.value)
              console.log(searchFilter)
            }
            } 
            onKeyDown={handleKeyDown}
            placeholder="Search employees" />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => hadleSortingClick('firstName')}>First Name {sorting.criteria === 'firstName' && (sorting.order === 'asc' ? '⬆️' : '⬇️')}</th>
            <th onClick={() => hadleSortingClick('lastName')}>Last Name {sorting.criteria === 'lastName' && (sorting.order === 'asc' ? '⬆️' : '⬇️')}</th>
            <th onClick={() => hadleSortingClick('position')}>Position {sorting.criteria === 'position' && (sorting.order === 'asc' ? '⬆️' : '⬇️')}</th>
            <th onClick={() => hadleSortingClick('level')}>Level {sorting.criteria === 'level' && (sorting.order === 'asc' ? '⬆️' : '⬇️')}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.position}</td>
              <td>{employee.level}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="equipment-table">
      <EquipmentTable equipments={equipments} onUpdate={updateEquipment} onDelete={deleteEquipment} />
      </div>
    </div>
  );
};


export default EmployeeTable;

import React, { useState } from "react";
import Equipment from "./Equipment";

const EquipmentTable = ({ equipments, onUpdate, onDelete }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleAmountFilterChange = (event) => {
    setAmountFilter(event.target.value);
  };

  const handleSort = (event, key) => {
    event.preventDefault();
    if (key === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedEquipments = equipments
    .filter((equipment) =>
      equipment.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
    .filter((equipment) =>
      equipment.type.toLowerCase().includes(typeFilter.toLowerCase())
    )
    .filter((equipment) => equipment.amount.toString().includes(amountFilter))
    .sort((a, b) => {
      if (sortKey === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortKey === "amount") {
        return sortDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
      return 0;
    });

  return (
    <div>
      <div>
        <label htmlFor="nameFilter">Name:</label>
        <input
          type="text"
          id="nameFilter"
          value={nameFilter}
          onChange={handleNameFilterChange}
        />
      </div>
      <div>
        <label htmlFor="typeFilter">Type:</label>
        <input
          type="text"
          id="typeFilter"
          value={typeFilter}
          onChange={handleTypeFilterChange}
        />
      </div>
      <div>
        <label htmlFor="amountFilter">Amount:</label>
        <input
          type="text"
          id="amountFilter"
          value={amountFilter}
          onChange={handleAmountFilterChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <a href="#" onClick={(event) => handleSort(event, "name")}>
                Name {sortKey === "name" && (sortDirection === "asc" ? "▲" : "▼")}
              </a>
            </th>
            <th>Type</th>
            <th>
              <a href="#" onClick={(event) => handleSort(event, "amount")}>
                Amount {sortKey === "amount" && (sortDirection === "asc" ? "▲" : "▼")}
              </a>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEquipments.map((equipment) => (
            <Equipment
              key={equipment.id}
              equipment={equipment}
              onUpdate={onUpdate
              }
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}    
export default EquipmentTable;


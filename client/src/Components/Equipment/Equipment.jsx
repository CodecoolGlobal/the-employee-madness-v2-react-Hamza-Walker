import React, { useState } from "react";

const Equipment = ({ equipment, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(equipment.name);
  const [type, setType] = useState(equipment.type);
  const [amount, setAmount] = useState(equipment.amount);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(equipment.name);
    setType(equipment.type);
    setAmount(equipment.amount);
  };

  const handleSave = () => {
    setIsEditing(false);
    const updatedEquipment = {
      id: equipment.id,
      name,
      type,
      amount
    };
    onUpdate(updatedEquipment);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          equipment.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        ) : (
          equipment.type
        )}
      </td>
      <td>
        {isEditing ? (
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        ) : (
          equipment.amount
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => onDelete(equipment.id)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default Equipment;

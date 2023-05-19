import React, { useState, useEffect } from 'react';
import Loading from '../Components/Loading';
import { useParams } from 'react-router-dom';

const EmployeeNotes = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const [noteInput, setNoteInput] = useState('');

  const fetchEmployee = (id) => {
    return fetch(`/api/employees/${id}`).then((res) => res.json());
  };

  useEffect(() => {
    fetchEmployee(id).then((res) => {
      setEmployee(res);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  const handleAddNote = () => {
    const note = {
      title: 'New Note', // Set the desired title for the new note
      content: noteInput,
    };

    // Make a PATCH request to update the employee's notes
    fetch(`/api/employees/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes: note }),
    })
      .then((res) => res.json())
      .then((updatedEmployee) => {
        setEmployee(updatedEmployee);
        setNoteInput('');
      })
      .catch((error) => {
        console.error('Error adding note:', error);
      });
  };

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {employee.notes && employee.notes.map((note) => (
              <tr key={note._id}>
                <td>{note.title}</td>
                <td>{note.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <input
          type="text"
          placeholder="Add a note"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        />
        <button type="button" onClick={handleAddNote}>
          Add
        </button>
      </div>
    </div>
  );
  
  
};

export default EmployeeNotes;

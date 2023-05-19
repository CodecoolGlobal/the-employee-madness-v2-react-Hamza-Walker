import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const fetchEmployee = async (id) => {
    const response = await fetch(`/api/employees/${id}`);
    return response.json();
}

const WorkLogForm = () => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [taskInput, setTaskInput] = useState('');

    useEffect(() => {
        fetchEmployee(id)
            .then((employee) => {
                setEmployee(employee);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);
    

    if (loading) {
        return <Loading />;
    }

    const handleSubmit = async (event) => {
            event.preventDefault();
            const workLog = {
                task: taskInput,
                hours: parseInt(Math.floor(Math.random() * 10) + 1),
            }
            fetch(`/api/employees/${id}/workLog`, {
                method: 'PATCH',
                headers: {
                    'content-type' : 'application/json',
                },
                body: JSON.stringify(workLog),
            })
            .then((response) => response.json())
            .then((updatedEmployee) => {
                setEmployee(updatedEmployee);
                setTaskInput('');
            })
            .catch((error) => {
                console.error("error updating tasks in the worklog !", error);
            });

        }
    
    const handleUpdate = (workLogId) => {
        const workLog = {
            task: taskInput,
            hours: parseInt(Math.floor(Math.random() * 10) + 1),
        }
        fetch(`/api/workLog/update/${workLogId}`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(workLog),
          })
            .then((response) => response.json())
            .then((updatedEmployee) => {
              setEmployee(updatedEmployee);
              setTaskInput('');
            })
            .catch((error) => {
              console.error("error updating tasks in the worklog!", error);
            });
        }

        return (
            <>
              {employee && (
                <div>
                  <form onSubmit={handleSubmit}>
                    <input
                      type='text'
                      key={employee._id}
                      value={taskInput}
                      onChange={(event) => setTaskInput(event.target.value)}
                    />
                    <button type='submit'>Submit a New task</button>
                  </form>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Task</th>
                        <th>Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employee.workLog.map((workLog) => (
                        <tr key={workLog._id}>
                          <td>{employee.name}</td>
                          <td>{workLog.task}</td>
                          <td>{workLog.hours}</td>
                          <td>
                            <button type="button" onClick={() => handleUpdate(workLog._id)}>
                              Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          );
        }
      


export default WorkLogForm;

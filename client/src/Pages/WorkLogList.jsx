import React,{useState, useEffect} from 'react'
import {useParams} from "react-router-dom"


const WorkLogList = () => {
    const {id} = useParams()
    const [workLog, setWorkLog] = useState([])
    const [employee, setEmployee] = useState({})
    const [taskName, setTaskName] = useState("")
    const [taskDuration, setTaskDuration] = useState("")
    
    const fetchemployee =(id) => {
        return fetch(`/api/employees/${id}`).then( res => res.json())
    }

    useEffect (() => {
        fetchemployee(id).then((data) => {
            setEmployee(data)
        })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newTask = {
            task: taskName,
            time: taskDuration
        }
        fetch(`/api/employees/${id}/worklog`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        }).then(() => {
            fetchemployee(id).then((data) => {
                setEmployee(data)
            })
        })
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Task:
                <input type="text" name="name" defaultValue={"enter a task "}  onChange={(e)=> setTaskName(e.target.value)}/>
            </label>
            <label>
                Hours:
                <select name="hours" value={taskDuration} onChange={(e)=> setTaskDuration(e.target.value)}>
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                </select>
            </label>
            <button type="submit">Submit</button>
        </form>
        {console.log(taskDuration, taskName)}
        <table>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Hours</th>
                </tr>
            </thead>
            <tbody>
            {employee?.workLog?.map((task) => (
                <tr key={task._id}>
                <td>{task.task}</td>
                <td>{task.time}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default WorkLogList
import React,{useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import Loading from '../Components/Loading'

const fetchEmployees = () => {
    return fetch("/api/employees").then((res) => res.json());
  };

const EmployeeExperience = () => {
    const navigate = useNavigate()
    const { num } = useParams()
    const [employees, setEmployees] = useState([]) 
    const [loading, setLoading] = useState(true)
    const [sortOrder, setSortOrder] = useState("asc")
    const employeesLargerThanNum = employees ? employees.filter((employee) => employee.yearsOfExperience > num) : []

    const sortedEmployees = (employees) => {
        if (sortOrder === "asc"){
            return employees.sort((a, b) => a.name.localeCompare(b.name))
        } else {    
            return employees.sort((a, b) => b.name.localeCompare(a.name))
        }
    }
    useEffect(() => {
        fetchEmployees().then((employees) => {
            setEmployees(employees)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <Loading />
    }
    if (parseInt(num) < 0 || isNaN(parseInt(num))) {
        fetch (`/api/employees/error/${num}`).then((res) => {
            if (res.status === 404) {
                navigate('/404');
            }
        })
        return null;
      }
      
  return (
    <div>
        {console.log(employees)}
        <table>
            <thead>
                <tr>
                    <th>Name
                    <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                    {sortOrder === "asc" ? "▲" : "▼"}
                    </button>
                    
                    </th>
                    <th>Level</th>
                    <th>Position</th>
                    <th>Experience</th>
                </tr>
            </thead>
            <tbody>
                {sortedEmployees(employees).map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.level}</td>
                        <td>{employee.position}</td>
                        <td>{employee.yearsOfExperience}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default EmployeeExperience
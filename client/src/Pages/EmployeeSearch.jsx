import React,{useEffect,useState} from 'react'

const fetchEmployess = async () => {    
    return fetch("/api/employees")
        .then((response) => response.json())
}
const EmployeeSearch = () => {
    const [employees, setEmployees] = useState([]);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        fetchEmployess().then((data) => {
            setEmployees(data);
        });
    }, []);
    
    
    const FindSimilarNames =(userInput)=> {
        return fetch(`/api/employees/search/${userInput}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setEmployees(data);
            }
            );
    }
    const FindSimilarEmployees =(employee)=> {
        const {position,level} = employee;
        return fetch(`/api/employees/${position}/${level}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setEmployees(data);
            }
            );
    }
  return (
    <div>
        <lebel>Search by Name : </lebel>
        <input type="text" placeholder="Enter Name" onChange={(e)=>{
            setUserInput(e.target.value)
            console.log(employees)
            }} />
        <button onClick={()=>FindSimilarNames(userInput)}>Search</button>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>level</th>
                    <th>posittion</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                    <tr key={employee._id}>
                        <td>{employee.name}</td>
                        <td>{employee.level}</td>
                        <td>{employee.position}</td>
                        <td>
                            <button type="button" onClick={()=> FindSimilarEmployees(employee)}>Similar Employees</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default EmployeeSearch
import React,{useState, useEffect} from 'react'
import EmployeeHobbies from "../Components/EmployeeHobbies"
import Loading from '../Components/Loading'

//ToDo: fetch the employee hobies from the server and pass them to the EmployeeHobbies component
const fetchEmployeesWithHobbies = () => {
    return fetch('/api/hobbies/').then(res => res.json())
}

const EmployeeHobbiesPage = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState(false);

    useEffect(() => {
        fetchEmployeesWithHobbies()
        .then(employeesWithHobbies => {
            setLoading(false);  
            setEmployees(employeesWithHobbies);
        })
    }, []);
                
    if (loading) {
        return <Loading />;
    }   

  return (  <EmployeeHobbies employees ={employees}/>  )
}

export default EmployeeHobbiesPage

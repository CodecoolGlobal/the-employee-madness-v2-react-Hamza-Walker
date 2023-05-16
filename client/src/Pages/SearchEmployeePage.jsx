import React,{useEffect, useState} from 'react'
import EmployeeSearch from '../Components/EmployeeSearch'
import Loading from '../Components/Loading';
const fetchEmployees = () => {

    return fetch("/api/employees").then((res) => res.json());
  };
  
const SearchEmployeePage = () => {
    const [employees, setEmployees] = useState(null);
    const [loading, setLoading] = useState(true);   

    useEffect(() => {
        fetchEmployees()
            .then((employees) => {
                setLoading(false);
                setEmployees(employees);
            })
    }, []);

    if (loading) {
        return <Loading />;
    }
  return (
    <>
    <EmployeeSearch employees={employees}/>
    </>
  )
}

export default SearchEmployeePage
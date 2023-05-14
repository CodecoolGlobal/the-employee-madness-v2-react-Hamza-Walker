import React, { useState, useEffect } from "react";
import EmployeeSearch from "../Components/EmployeeSearch/EmployeeSearch";
import Loading from "../Components/Loading";

const fetchEmployees = async() => {
  return fetch("/api/employees").then((res) => res.json());
};

function EmployeeSearchPage() {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState(null);
  
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
    
  return < EmployeeSearch employees={employees} />;
}

export default EmployeeSearchPage;

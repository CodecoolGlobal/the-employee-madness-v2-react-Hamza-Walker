import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [filterHeight, setFilterHeight] = useState(""); // New state for the filter height


  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        if (filterHeight) {
          const filteredEmployees = employees.filter(
            (employee) => employee.height > filterHeight
          );
          setEmployees(filteredEmployees);
        } else {
          setEmployees(employees);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, [filterHeight]);
  
  
  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

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

  const updateEmployee = (id,height) => {
    return fetch (`/api/employees/${id}`, {
      method : "PUT", 
      headers : { "Content-type" : "application/json"},
      body : JSON.stringify(height),
    }).then(res => res.json())
  }

  const handleRandomizedHeight = () => {
    const updatedEmployees = employees.map(employee => {
      const randomHeight = Math.floor(Math.random() * (190 - 140 + 1) + 140)
      return {...employee , height : randomHeight}
    })
    Promise.all ( 
      updatedEmployees.map(employee => updateEmployee(employee._id, {height : employee.height})
      ))
      .then(() => {
        setEmployees(updatedEmployees)
      })
      .catch(error => {
        console.error("Error updating employees:", error )
      })
    
    console.log(updatedEmployees)
  }


  return( 
    <div>
      <input type="text"
      placeholder=" filter by height "
      value={filterHeight}
      onChange={(e) => setFilterHeight(e.target.value)}
      />
      <button type="button" onClick={handleRandomizedHeight}>Randomize Height</button>
      <EmployeeTable employees={employees} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeList;

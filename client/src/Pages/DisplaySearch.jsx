import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";

const DisplaySearch = (name) => {
//   return fetch(`/api/employees?name=${name}`).then((res) => res.json());
// };

// const DisplaySearch = (props) => {
//   const [loading, setLoading] = useState(true);
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const name = props.match.params.name;
//     fetchEmployeesByName(name)
//       .then((employees) => {
//         setLoading(false);
//         setSearchResults(employees);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [props.match.params.name]);

//   if (loading) {
//     return <Loading />;

  return (
    <div>
        <h1>Search Results</h1>
      {/* <h2>Search Results for "{props.match.params.name}"</h2> */}
      {/* {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((employee) => (
            <li key={employee._id}>{employee.name}</li>
          ))}
        </ul>
      ) : (
        <p>No employees found.</p> */}
      {/* )} */}
    </div>
  );
};

export default DisplaySearch;

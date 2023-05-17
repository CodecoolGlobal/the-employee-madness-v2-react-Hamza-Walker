import React from 'react'

const EmployeeHobbies = ({employees}) => {
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Positoin</th>
                    <th>Level</th>
                    <th>Hobbies</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                    <tr key={employee._id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.position}</td>
                    <td>{employee.level}</td>
                    <td>
                        {employee.hobbies.map((hobby, index) => (
                        <div key={index}>
                            <span>{hobby.name}</span>
                        </div>
                        ))}
                    </td>
                    </tr>
                ))}
                </tbody>
        </table>
    </div>
  )
}

export default EmployeeHobbies
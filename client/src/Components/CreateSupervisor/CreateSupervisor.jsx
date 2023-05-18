import React,{useState} from 'react'

const CreateSupervisor = () => {
  const [supervisorName, setSupervisorName] = useState('')

  const handleSubmit = (event)  => {
    event.preventDefault()
    fetch('/api/supervisors', {
        method: 'POST',
        headers: {  
                'Content-Type': 'application/json'
                },
        body:JSON.stringify({"name":supervisorName})
    }).then(response => response.json())
  }



  return (
    <div className='create-supervisor'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='supervisor-name'>Supervisor Name</label>
        <input 
        type='text'
        placeholder={"enter name"} 
        value={supervisorName}
        onChange={(e) => setSupervisorName(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>

    </div>  
    )
}

export default CreateSupervisor
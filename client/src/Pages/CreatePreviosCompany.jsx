import React,{useState} from 'react'



const CreatePreviosCompany = () => {
    
    const [companyName, setCompanyName] = useState('')


    const saveCompany = async () => {
        fetch('/api/previousCompany', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
                    },
            body: JSON.stringify({name: companyName})
        })
    }
    
                    
    const handleSubmit = (event) => {
        event.preventDefault()
        saveCompany()
        }




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Company Name</label>
                <input type="text"
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
    }

export default CreatePreviosCompany
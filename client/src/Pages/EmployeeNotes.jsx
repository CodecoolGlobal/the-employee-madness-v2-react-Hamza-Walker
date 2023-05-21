import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'

const EmployeeNotes = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState({})
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const fetchEmployee = (id) => {
        return fetch(`/api/employees/${id}`)
        .then(res => res.json())
    }

    useEffect(() => {
        fetchEmployee(id)
        .then(data => setEmployee(data))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newNote = {
            title: title,
            content: content
        }

        const updatedEmployee =(newNote)=> {
            fetch(`/api/employees/${id}/notes`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({notes:newNote})
            })
            .then(res => res.json())
            .then(data => {
                setEmployee(data)
                setTitle('')
                setContent('')
            })
        }
        updatedEmployee (newNote)

        console.log(title, content)
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="content">Content</label>
            <input type="text" id="content" value={content} onChange={(e) => setContent(e.target.value)} />
            <button type="submit" >Add Note</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Note Title</th>
                    <th>Note constent</th>
                </tr>
            </thead>
            <tbody>
                {employee.notes && employee.notes.map((note) => (
                    <tr key={note._id}>
                        <td>{employee.name}</td>
                        <td>{note.title}</td>
                        <td>{note.content}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default EmployeeNotes
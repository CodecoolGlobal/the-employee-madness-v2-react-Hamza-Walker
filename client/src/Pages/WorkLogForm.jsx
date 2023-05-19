import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const fetchEmployee = async (id) => {
    const response = await fetch(`/api/employees/${id}`);
    return response.json();
}

const WorkLogForm = () => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        fetchEmployee(id)
            .then((employee) => {
                setEmployee(employee);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);
    

    if (loading) {
        return <Loading />;
    }

    return (
        <div>{console.log(employee)}</div>
    );
}

export default WorkLogForm;

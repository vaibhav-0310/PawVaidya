import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function Consult() {
    const { id } = useParams();
    const [consultation, setConsultation] = React.useState(null);

    useEffect(() => {
        const fetchConsultation = async () => {
            try {
                const response = await axios.get(`/api/vet/${id}`);
                setConsultation(response.data);
            } catch (error) {
                console.error('Error fetching consultation:', error);
            }
        };

        fetchConsultation();

    }, []);
    return (<>
        {consultation ? (
            <div>
                <h2>Consultation Details</h2>
                <p>ID: {consultation._id}</p>
                <p>Pet Name: {consultation.name}</p>
                <p>Post: {consultation.post}</p>
            </div>
        ) : (
            <p>Loading consultation details...</p>
        )}
    </>);
}

export default Consult;
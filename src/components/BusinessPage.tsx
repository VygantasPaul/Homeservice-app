// src/components/BusinessPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BusinessPage = () => {
    const { id } = useParams();
    const [business, setBusiness] = useState(null);

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const response = await axios.get(`/api/businesses/${id}`);
                setBusiness(response.data);
            } catch (error) {
                console.error('Error fetching business:', error);
            }
        };

        fetchBusiness();
    }, [id]);

    if (!business) return <p>Loading...</p>;

    return (
        <div>
            <h1>{business.name}</h1>
            <p>{business.description}</p>
            <button onClick={() => alert('Book appointment')}>Book Appointment</button>
        </div>
    );
};

export default BusinessPage;

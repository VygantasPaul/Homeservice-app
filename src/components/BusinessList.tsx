import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get('http://localhost:5520/api/businesses/');
                setBusinesses(response.data);
            } catch (error) {
                console.error('Error fetching businesses:', error);
            }
        };

        fetchBusinesses();
    }, []);

    return (
        <div>
            <h2>Businesses</h2>
            <ul>
                {businesses.map((business, index) => (
                    <li key={business.id || index}>
                        <a href={`/business/${business._id}`}>{business.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusinessList;

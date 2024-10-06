import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Business {
    _id: string;
    name: string;
}

const BusinessList: React.FC = () => {
    const [businesses, setBusinesses] = useState<Business[]>([]);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get<Business[]>('http://localhost:5600/api/business/');
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
                {businesses.map((business) => (
                    <li key={business._id}>
                        <a href={`/business/${business._id}`}>{business.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusinessList;

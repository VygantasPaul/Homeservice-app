// src/components/MyBookings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/api/my-bookings');
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <h2>My Bookings</h2>
            <ul>
                {bookings.map(booking => (
                    <li key={booking.id}>{booking.businessName} on {booking.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default MyBookings;

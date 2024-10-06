import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Booking {
    _id: string; // Changed from 'id' to '_id'
    business_id: string; // Added 'business_id' if you need it
    date: string;
    service: string; // Added 'service' to display it if needed
}

const MyBookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Get the user from localStorage (or from a context if you manage user globally)
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await axios.get<{ bookings: Booking[] }>('http://localhost:5600/api/booking', {
                    headers: {
                        Authorization: `Bearer ${user.token}`, // Send the token for authorization
                    },
                });
                setBookings(response.data.bookings); // Access the bookings array directly
            } catch (error) {
                setError('Error fetching bookings. Please try again later.');
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        // Fetch bookings only if user is logged in
        if (user.token) {
            fetchBookings();
        } else {
            setLoading(false); // Set loading to false if no user token
            setError('You must be logged in to view your bookings.'); // Set error if not logged in
        }
    }, [user.token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings available.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._id}> {/* Use _id as the key */}
                            {booking.service} for business ID: {booking.business_id} on {new Date(booking.date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyBookings;

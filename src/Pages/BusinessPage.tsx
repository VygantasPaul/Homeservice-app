import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Business {
    _id: string;
    name: string;
    description: string;
}

const BusinessPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Fetch the business ID from the route params
    const [business, setBusiness] = useState<Business | null>(null);
    const [appointmentDate, setAppointmentDate] = useState<string>('');
    const [service, setService] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Retrieve user info from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const response = await axios.get<Business>(`http://localhost:5600/api/business/${id}`);
                setBusiness(response.data);
            } catch (error) {
                console.error('Error fetching business:', error);
            }
        };

        fetchBusiness();
    }, [id]);

    const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user.token) {
            setError('You must be logged in to book an appointment.');
            return;
        }

        if (!business) {
            setError('No business information available.');
            return;
        }

        try {
            const appointmentData = {
                userId: user._id,
                businessId: business._id, // Assuming user ID is stored in localStorage
                date: appointmentDate,
                service,
            };

            // POST request to the modified endpoint with the business ID
            const response = await axios.post(`http://localhost:5600/api/booking/business/${business._id}`, appointmentData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            setSuccessMessage('Appointment booked successfully!');
            setError(null);
        } catch (error) {
            console.error('Error booking appointment:', error);
            setError('Failed to book appointment. Please try again.');
        }
    };

    if (!business) return <p>Loading...</p>;

    return (
        <div>
            <h1>{business.name}</h1>
            <p>{business.description}</p>
            <form onSubmit={handleBooking}>
                <h2>Book Appointment</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <div>
                    <label htmlFor="appointmentDate">Date:</label>
                    <input
                        type="date"
                        id="appointmentDate"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="service">Service:</label>
                    <input
                        type="text"
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default BusinessPage;

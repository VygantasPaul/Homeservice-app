// src/components/AppointmentModal.tsx
import React from 'react';

// Define the Business type according to your structure
interface Business {
    name: string;
    // Add any other properties that are part of the business object
}

interface AppointmentModalProps {
    business: Business;
    isOpen: boolean;
    closeModal: () => void; // Define the type for the closeModal function
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ business, isOpen, closeModal }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Book an Appointment at {business.name}</h2>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default AppointmentModal;

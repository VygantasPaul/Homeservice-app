// src/components/AppointmentModal.js
// @ts-ignore
import React, { useState } from 'react';

const AppointmentModal = ({ business, isOpen, closeModal }) => {
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

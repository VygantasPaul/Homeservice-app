import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import BusinessList from './components/BusinessList';
import BusinessPage from './components/BusinessPage';
import LoginForm from './components/LoginForm';
import MyBookings from './components/MyBookings';
import AvatarDropdown from './components/AvatarDropdown';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BusinessList />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/business/:id" element={<BusinessPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/my-bookings" element={<MyBookings />} />
            </Routes>
            <AvatarDropdown />
        </Router>
    );
};

export default App;

import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import Layout from './components/Layout/Layout';

import BusinessList from './components/BusinessList';
import CategoryList from './components/CategoryList';
import BusinessPage from "./Pages/BusinessPage";
import MyBooking from "./components/MyBookings";
import LoginForm from "./Pages/LoginForm";
import RegisterForm from "./Pages/RegisterForm";

interface User {
    id: string;
    email: string;
    token: string;
}

const App = () => {
    const [user, setUser] = useState<User | null>(null); // Manage user state

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/business/:id" element={<BusinessPage />} />
                    <Route path="/booking" element={<MyBooking />} />
                    <Route path="/login" element={<LoginForm setUser={setUser} />} />
                    <Route path="/register" element={<RegisterForm setUser={setUser} />} />
                    <Route path="/business" element={<BusinessList />} />
                    <Route path="/categories" element={<CategoryList />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;

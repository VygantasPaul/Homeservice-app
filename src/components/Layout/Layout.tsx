import React from 'react';
import Header from '../Header/header'; // Import your Header component
import Footer from '../Footer/footer'; // Import your Footer component (if you have one)
import './Layout.css'; // Optional: Add your CSS styles here

interface LayoutProps {
    children: React.ReactNode; // To pass child components to Layout
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

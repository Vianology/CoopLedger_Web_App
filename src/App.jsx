import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
import OtpVerify from './pages/Auth/OtpVerify/OtpVerify';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import Votes from './pages/Votes/Votes';
import Cooperatives from './pages/Cooperatives/Cooperatives';
import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';
import logoImg from './assets/logos/logo.png';

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

function AppContent() {
    const location = useLocation();

    const Links = [
        { label: "Accueil",       href: "/" },
        { label: "Transactions",  href: "/2" },
        { label: "Votes",         href: "/3" },
        { label: "Coopératives",  href: "/4" }
    ];

    const Icons = [];

    const hideNavbar = [
        '/dashboard', '/transactions', '/votes', '/cooperatives'
    ].includes(location.pathname);

    return (
        <>
            {!hideNavbar && (
                <Navbar
                    logo={{ src: logoImg, alt: "Logo CoopLedger" }}
                    brandName="CoopLedger"
                    navLinks={Links}
                    actionIcons={Icons}
                />
            )}

            <Routes>
                <Route path="/"               element={<Home />} />
                <Route path="/home"           element={<Home />} />
                <Route path="/register"       element={<Register />} />
                <Route path="/login"          element={<Login />} />
                <Route path="/otp"            element={<OtpVerify />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard"      element={<Dashboard />} />
                <Route path="/transactions"   element={<Transactions />} />
                <Route path="/votes"          element={<Votes />} />
                <Route path="/cooperatives"   element={<Cooperatives />} />
                <Route path="/profile"        element={<Register />} />
                <Route path="/livre"          element={<div style={{ padding: '2rem' }}>Page Livre (À venir)</div>} />
            </Routes>
        </>
    );
}

export default App;
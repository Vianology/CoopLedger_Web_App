import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
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
        { label: "Accueil", href: "/" },
        { label: "Livre", href: "/livre" },
/*         { label: "Vote", href: "/vote" }, */
        { label: "Profil", href: "/profile" }
    ];

    const Icons = [];

    // Masquer la navbar sur le dashboard et sur la page des transactions
    const isDashboardOrTransactions = ['/dashboard', '/transactions', '/votes', '/cooperatives'].includes(location.pathname);

    return (
        <>
            {!isDashboardOrTransactions && (
                <Navbar 
                    logo={{ src: logoImg, alt: "Logo CoopLedger" }}
                    brandName="CoopLedger"
                    navLinks={Links}
                    actionIcons={Icons}
                />
            )}
            
            <Routes>
                <Route path="/" element={<Home />} />
                 <Route path="/home" element={<Home />} />
                <Route path="/livre" element={<div style={{padding: '2rem'}}>Page Livre (À venir)</div>} />
                <Route path="/profile" element={<Register />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/votes" element={<Votes/>} />
                <Route path="/cooperatives" element={<Cooperatives/>} />
            </Routes>
        </>
    );
}

export default App;
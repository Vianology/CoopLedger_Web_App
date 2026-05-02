import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
import Vote from './pages/Vote';
import logoImg from './assets/logos/logo.png';
import { Bell, CircleUserRound} from 'lucide-react';

function App() {
    const Links = [
        { label: "Accueil", href: "/" },
        { label: "Livre", href: "/livre" },
        { label: "Vote", href: "/vote" },
        { label: "Profil", href: "/profile" }
    ];

    // const Icons = [
    //     { icon: Bell, onClick: () => alert("Notifications !") },
    //     { icon: CircleUserRound, onClick: () => alert("Profil") },
    // ];
    const Icons = [];

    return (
        <Router>
            <Navbar 
                logo={{ src: logoImg, alt: "Logo CoopLedger" }}
                brandName="CoopLedger"
                navLinks={Links}
                actionIcons={Icons}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/livre" element={<div style={{padding: '2rem'}}>Page Livre (À créer dans /pages)</div>} />
                <Route path="/vote" element={<Vote/>}/>
                <Route path="/profile" element={<Register/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </Router>
    );
}

export default App;
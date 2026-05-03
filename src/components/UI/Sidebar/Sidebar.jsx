import React from 'react';
import { 
    LayoutDashboard, 
    BarChart3, 
    ShieldCheck, 
    Settings, 
    HelpCircle, 
    LogOut 
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, onClose }) => {
    const links = [
        { name: 'Tableau de bord', icon: LayoutDashboard, path: '/dashboard', active: true },
        { name: 'Transactions', icon: BarChart3, path: '/transactions' },
        { name: 'Certificats', icon: ShieldCheck, path: '/certifications' },
        { name: 'Paramètres', icon: Settings, path: '/settings' },
    ];

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            {/* Overlay cliquable sur mobile */}
            {isOpen && <div className={styles.overlay} onClick={onClose} />}

            <div className={styles.inner}>
                <div className={styles.brand}>
                    <span className={styles.logo}>C</span>
                    <span className={styles.brandName}>CoopLedger</span>
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.linkGroup}>
                        {links.map((link, idx) => {
                            const Icon = link.icon;
                            return (
                                <li key={idx}>
                                    <a 
                                        href={link.path} 
                                        className={`${styles.link} ${link.active ? styles.active : ''}`}
                                        onClick={onClose}
                                    >
                                        <Icon size={18} />
                                        <span>{link.name}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className={styles.footer}>
                    <a href="/help" className={styles.link}>
                        <HelpCircle size={18} />
                        <span>Aide</span>
                    </a>
                    <button className={styles.logoutBtn} onClick={() => alert('Déconnexion')}>
                        <LogOut size={18} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
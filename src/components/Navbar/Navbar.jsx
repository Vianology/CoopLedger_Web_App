import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import styles from './navbar.module.css';

function Navbar({ logo, brandName, navLinks = [], actionIcons = [] }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('coopledger-theme') || 'light';
    });
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('coopledger-theme', theme);
    }, [theme]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Ferme le menu si on redimensionne vers desktop
    useEffect(() => {
        const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

    return (
        <header className={`${styles.navbar_wrapper} ${scrolled ? styles.scrolled : ''}`}>
            <nav className={styles.navbar_container}>
                {/* BRAND */}
                <NavLink to="/" className={styles.brand_section}>
                    {logo && <img src={logo.src} alt={logo.alt} className={styles.logo_img} />}
                    {brandName && <span className={styles.brand_name}>{brandName}</span>}
                </NavLink>

                {/* LINKS — desktop */}
                <ul className={styles.nav_links}>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink
                                to={link.href}
                                className={({ isActive }) =>
                                    isActive ? `${styles.nav_item} ${styles.active}` : styles.nav_item
                                }
                            >
                                {link.label}
                                <span className={styles.loader_bar} />
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* ACTIONS */}
                <div className={styles.actions_section}>
                    {/* Icônes custom */}
                    {actionIcons.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className={styles.icon_button}
                                aria-label="action"
                            >
                                <IconComponent size={18} />
                            </button>
                        );
                    })}

                    {/* Toggle dark/light */}
                    <button
                        onClick={toggleTheme}
                        className={`${styles.icon_button} ${styles.theme_toggle}`}
                        aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
                        title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                    >
                        <span className={styles.toggle_track}>
                            <span className={`${styles.toggle_thumb} ${theme === 'dark' ? styles.toggle_dark : ''}`}>
                                {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
                            </span>
                        </span>
                    </button>

                    {/* Burger — mobile */}
                    <button
                        className={`${styles.burger} ${menuOpen ? styles.burger_open : ''}`}
                        onClick={() => setMenuOpen(prev => !prev)}
                        aria-label="Menu"
                        aria-expanded={menuOpen}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* MENU MOBILE */}
            <div className={`${styles.mobile_menu} ${menuOpen ? styles.mobile_menu_open : ''}`}>
                <ul className={styles.mobile_links}>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink
                                to={link.href}
                                className={({ isActive }) =>
                                    isActive ? `${styles.mobile_link} ${styles.mobile_active}` : styles.mobile_link
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}

export default Navbar;
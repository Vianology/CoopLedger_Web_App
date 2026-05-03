import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    ShieldCheck,
    Building2,
    Settings,
    LogOut,
    Bell,
    Menu,
    X,
    Sun,
    Moon,
    ChevronRight,
    Plus,
    Vote,
} from 'lucide-react';
import styles from './AppLayout.module.css';
import logoImg from '../../assets/logos/logo.png';
import Button from '../../components/UI/Button/Button';

/* ─────────────────────────────────────────────
   Hook : thème persistant via data-theme + localStorage
───────────────────────────────────────────── */
function useTheme() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return false;
        const saved = localStorage.getItem('coopledger-theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('coopledger-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return [isDark, () => setIsDark(prev => !prev)];
}

/* ─────────────────────────────────────────────
   Navigation items
───────────────────────────────────────────── */
const NAV_ITEMS = [
    { label: 'Tableau de bord', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Transactions',    icon: FileText,         path: '/transactions' },
    { label: 'Votes',          icon: Vote,      path: '/votes' },
    { label: 'Coopératives',   icon: Building2,        path: '/cooperatives' },
];

const BOTTOM_ITEMS = [
    { label: 'Paramètres', icon: Settings, path: '/settings' },
];

/* ─────────────────────────────────────────────
   NavLink avec indicateur actif
───────────────────────────────────────────── */
const NavLink = ({ item, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === item.path ||
        (item.path !== '/' && location.pathname.startsWith(item.path));
    const Icon = item.icon;

    return (
        <Link
            to={item.path}
            className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
        >
            <span className={styles.navIcon}>
                <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
            </span>
            <span className={styles.navLabel}>{item.label}</span>
            {isActive && <ChevronRight size={13} className={styles.navChevron} />}
        </Link>
    );
};

/* ─────────────────────────────────────────────
   Composant principal
───────────────────────────────────────────── */
const AppLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDark, toggleTheme] = useTheme();
    const location = useLocation();

    // Ferme la sidebar mobile à chaque changement de route
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    // Titre de la page courante
    const currentPage = NAV_ITEMS.find(item =>
        location.pathname === item.path ||
        (item.path !== '/' && location.pathname.startsWith(item.path))
    );

    return (
        <div className={styles.wrapper}>

            {/* ── Overlay mobile ── */}
            {isSidebarOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* ══════════════════════════════════════
                SIDEBAR
            ══════════════════════════════════════ */}
            <aside
                className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
                aria-label="Navigation principale"
            >
                {/* Brand */}
                <div className={styles.brand}>
                    <div className={styles.brandMark}>
                        <img src={logoImg} alt="Logo CoopLedger" className={styles.brandLogo} />
                    </div>
                    <span className={styles.brandName}>CoopLedger</span>
                    <button
                        className={styles.closeMobileBtn}
                        onClick={() => setIsSidebarOpen(false)}
                        aria-label="Fermer le menu"
                    >
                        <X size={17} />
                    </button>
                </div>

                {/* CTA */}
                <div className={styles.ctaWrapper}>
                    <Button variant="primary" icon={Plus} size="md">
                        Nouvelle proposition
                    </Button>
                </div>

                {/* Section label */}
                <span className={styles.sectionLabel}>Espace principal</span>

                {/* Nav principale */}
                <nav className={styles.nav} role="navigation">
                    {NAV_ITEMS.map(item => (
                        <NavLink
                            key={item.path}
                            item={item}
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    ))}
                </nav>

                {/* Spacer */}
                <div className={styles.navSpacer} />

                {/* Section label */}
                <span className={styles.sectionLabel}>Compte</span>

                {/* Nav secondaire */}
                <nav role="navigation" aria-label="Paramètres">
                    {BOTTOM_ITEMS.map(item => (
                        <NavLink
                            key={item.path}
                            item={item}
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    ))}
                </nav>

                {/* Footer sidebar */}
                <div className={styles.sidebarFooter}>
                    {/* Thème toggle */}
                    <button
                        className={styles.themeToggle}
                        onClick={toggleTheme}
                        aria-label={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
                        title={isDark ? 'Mode clair' : 'Mode sombre'}
                    >
                        <span className={styles.themeToggleTrack}>
                            <span className={`${styles.themeToggleThumb} ${isDark ? styles.themeToggleThumbDark : ''}`} />
                        </span>
                        <span className={styles.themeToggleIcon}>
                            {isDark ? <Sun size={14} /> : <Moon size={14} />}
                        </span>
                        <span className={styles.themeToggleLabel}>
                            {isDark ? 'Mode clair' : 'Mode sombre'}
                        </span>
                    </button>

                    {/* Divider */}
                    <div className={styles.divider} />

                    {/* User card */}
                    <div className={styles.userCard}>
                        <span className={styles.userAvatar}>AO</span>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>AGENONWOSSI Olivier</span>
                            <span className={styles.userRole}>Coopérative · Admin</span>
                        </div>
                    </div>

                    {/* Logout */}
                    <button className={styles.logoutBtn} aria-label="Se déconnecter">
                        <LogOut size={16} strokeWidth={1.8} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* ══════════════════════════════════════
                CONTENU PRINCIPAL
            ══════════════════════════════════════ */}
            <div className={styles.main}>

                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <button
                            className={styles.mobileMenuBtn}
                            onClick={() => setIsSidebarOpen(true)}
                            aria-label="Ouvrir le menu"
                        >
                            <Menu size={19} />
                        </button>

                        {/* Breadcrumb */}
                        <div className={styles.breadcrumb}>
                            <span className={styles.breadcrumbRoot}>CoopLedger</span>
                            {currentPage && (
                                <>
                                    <ChevronRight size={13} className={styles.breadcrumbSep} />
                                    <span className={styles.breadcrumbCurrent}>
                                        {currentPage.label}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={styles.headerRight}>
                        {/* Notif */}
                        <button className={styles.notifBtn} aria-label="Notifications">
                            <Bell size={17} strokeWidth={1.8} />
                            <span className={styles.notifDot} aria-hidden="true" />
                        </button>

                        {/* Thème (header, desktop uniquement en petit) */}
                        <button
                            className={styles.headerThemeBtn}
                            onClick={toggleTheme}
                            aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
                        >
                            {isDark ? <Sun size={16} /> : <Moon size={16} />}
                        </button>

                        {/* User */}
                        <div className={styles.headerUser}>
                            <span className={styles.headerAvatar}>AO</span>
                            <div className={styles.headerUserInfo}>
                                <span className={styles.headerUserName}>AGBENONWOSSI</span>
                                <span className={styles.headerUserRole}>Olivier</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Contenu */}
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
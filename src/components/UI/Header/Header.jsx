import React from 'react';
import { Search, Bell, Sun, User, Menu } from 'lucide-react';
import styles from './Header.module.css';

const Header = ({ 
    title, 
    subtitle, 
    onToggleIconComponentActionIcons, 
    onToggle, 
    onToggleSearchCallback, 
    onToggleActionIcons, 
    onToggleSidebar, 
    onToggleHeader, 
    onToggleMenuBtn, 
    onToggleSidebarClick, 
    onToggleActionIconArray, 
    onToggleFunctionalityValue, 
    onToggleSidebarCallback, 
    onToggleAction, 
    onToggleAll, 
    onToggleThisToggle, 
    onToggleAll2, 
    onToggleOptions, 
    onToggleOptions2 
}) => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <button className={styles.menuToggle} onClick={onToggleSidebar} aria-label="Menu">
                    <Menu size={18} />
                </button>
                <div>
                    <h1 className={styles.title}>{title}</h1>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.searchWrapper}>
                    <Search size={16} className={styles.searchIcon} />
                    <input 
                        type="text" 
                        placeholder="Rechercher..." 
                        className={styles.searchInput}
                    />
                </div>
                
                <button className={styles.actionBtn} aria-label="Notifications">
                    <Bell size={18} />
                </button>
                
                <button className={styles.actionBtn} aria-label="Changer de thème">
                    <Sun size={18} />
                </button>

                <div className={styles.divider} />

                <div className={styles.userProfile}>
                    <div className={styles.avatar}>
                        <User size={16} />
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>Jean Dupont</span>
                        <span className={styles.userRole}>Administrateur</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
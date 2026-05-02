import React from 'react';
import { Bell, Search } from 'lucide-react';
import styles from './DashboardHeader.module.css';

const DashboardHeader = ({ title, subtitle, userRole = "Coopérateur", userEmail = "agriculteur@coop.tg" }) => {
    return (
        <header className={styles.wrapper}>
            <div className={styles.titleSection}>
                <h1 className={styles.title}>{title}</h1>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            <div className={styles.actionsSection}>
                <div className={styles.searchContainer}>
                    <Search size={16} className={styles.searchIcon} />
                    <input type="text" placeholder="Rechercher..." className={styles.searchInput} />
                </div>
                <button className={styles.notificationBtn} aria-label="Notifications">
                    <Bell size={18} />
                    <span className={styles.indicator} />
                </button>
                <div className={styles.userProfile}>
                    <div className={styles.avatar}>
                        <span>{userRole.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{userRole}</span>
                        <span className={styles.userEmail}>{userEmail}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
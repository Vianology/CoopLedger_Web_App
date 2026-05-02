import React from 'react';
import styles from './StatusBadge.module.css';

const StatusBadge = ({ status, label, className = '' }) => {
    // status peut être : 'success', 'warning', 'danger', 'info'
    return (
        <span className={`${styles.badge} ${styles[status]} ${className}`}>
            {label}
        </span>
    );
};

export default StatusBadge;
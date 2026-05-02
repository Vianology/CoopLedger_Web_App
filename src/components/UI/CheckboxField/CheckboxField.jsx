import React from 'react';
import styles from './CheckboxField.module.css';

const CheckboxField = ({ 
    label, 
    size = 'md', // Accepte 'sm', 'md', 'lg'
    className = '', 
    ...props 
}) => {
    return (
        <div className={`${styles.wrapper} ${className}`}>
            <input 
                type="checkbox" 
                className={`${styles.checkbox} ${styles[size]}`} 
                {...props} 
            />
            {label && (
                <label htmlFor={props.id} className={styles.label}>
                    {label}
                </label>
            )}
        </div>
    );
};

export default CheckboxField;
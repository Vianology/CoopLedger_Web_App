import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ label, icon: Icon, error, ...props }) => {
    return (
        <div className={styles.formGroup}>
            {label && <label htmlFor={props.id} className={styles.label}>{label}</label>}
            <div className={styles.inputWrapper}>
                {Icon && <Icon className={styles.inputIcon} size={18} />}
                <input
                    className={`${styles.inputField} ${error ? styles.inputError : ''}`}
                    {...props}
                />
            </div>
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default InputField;
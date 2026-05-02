import React from 'react';
import styles from './SelectField.module.css';

const SelectField = ({ label, icon: Icon, options = [], ...props }) => {
    return (
        <div className={styles.formGroup}>
            {label && <label htmlFor={props.id} className={styles.label}>{label}</label>}
            <div className={styles.inputWrapper}>
                {Icon && <Icon className={styles.inputIcon} size={18} />}
                <select className={styles.selectField} {...props}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectField;
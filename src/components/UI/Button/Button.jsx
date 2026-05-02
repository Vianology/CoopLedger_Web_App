import React from 'react';
import styles from './Button.module.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    isLoading = false,
    disabled = false,
    className = '',
    ...props
}) => {
    const classNames = [
        styles.btn,
        styles[variant],
        styles[size],
        isLoading ? styles.loading : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classNames}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <span className={styles.spinner} />
            )}
            {Icon && iconPosition === 'left' && !isLoading && (
                <span className={styles.iconWrapper}>
                    <Icon size={18} />
                </span>
            )}
            <span className={styles.label}>{children}</span>
            {Icon && iconPosition === 'right' && !isLoading && (
                <span className={styles.iconWrapper}>
                    <Icon size={18} />
                </span>
            )}
        </button>
    );
};

export default Button;
import React from 'react';
import styles from './SocialButton.module.css';

const SocialButton = ({ icon: Icon, children, ...props }) => {
    return (
        <button type="button" className={styles.socialBtn} {...props}>
            {Icon && <Icon className={styles.socialIcon} size={18} />}
            {children}
        </button>
    );
};

export default SocialButton;
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from './StatCard.module.css';

const StatCard = ({ title, value, subtext, trend, icon: Icon, variant = 'default' }) => {
    const isPositive = trend && trend > 0;
    const isNegative = trend && trend < 0;

    return (
        <div className={`${styles.card} ${styles[variant]}`}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
                {Icon && (
                    <div className={styles.iconWrapper}>
                        <Icon size={20} />
                    </div>
                )}
            </div>
            <div className={styles.body}>
                <h3 className={styles.value}>{value}</h3>
                {trend && (
                    <div className={`${styles.trend} ${isPositive ? styles.positive : styles.negative}`}>
                        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>
            {subtext && <p className={styles.subtext}>{subtext}</p>}
        </div>
    );
};

export default StatCard;
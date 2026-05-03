import React from 'react';
import styles from './footer.module.css';
import logoImg from '../../assets/logos/logo.png';

const Footer = () => {
    return (
        <footer className={styles.wrapper}>
            <div className={`${styles.inner} container`}>

                <div className={styles.main}>

                    {/* Marque */}
                    <div className={styles.brand}>
                        <div className={styles.brand_top}>
                            <img src={logoImg} alt="CoopLedger" className={styles.logo} />
                            <span className={styles.brand_name}>CoopLedger</span>
                        </div>
                        <p className={styles.tagline}>
                            Le registre blockchain des coopératives agricoles togolaises. 
                        </p>
                    </div>

                    {/* Liens */}
                    <div className={styles.links_grid}>
                        <div className={styles.col}>
                            <h4 className={styles.col_title}>Navigation</h4>
                            <a href="/" className={styles.link}>Accueil</a>
                            <a href="2" className={styles.link}>Transactions</a>
                            <a href="3" className={styles.link}>Votes </a>
                            <a href="4" className={styles.link}>Coopératives</a>
                            <a href="/register" className={styles.link}>S'inscrir</a>
                            <a href="/login" className={styles.link}>Se connecter</a>
                        </div>
                        <div className={styles.col}>
                            <h4 className={styles.col_title}>Contact</h4>
                            <address className={styles.address}>
                                <span>contact@coopledger.tg</span>
                                <span>Lomé, Togo</span>
    
                            </address>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom_bar}>
                    <p className={styles.copyright}>
                        &copy; {new Date().getFullYear()} CoopLedger
                    </p>
                    <p className={styles.tech_note}>
                        Propulsé par Polygon · Smart contracts Solidity
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
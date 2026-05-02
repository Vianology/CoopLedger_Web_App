import React from 'react';
import styles from './footer.module.css';
import logoImg from '../../assets/logos/logo.png'; // Assurez-vous du bon chemin vers votre logo

const Footer = () => {
    return (
        <footer className={styles.wrapper}>
            <div className={`${styles.container} container`}>
                
                {/* Section principale */}
                <div className={styles.mainSection}>
                    
                    {/* Colonne de la marque */}
                    <div className={styles.brand}>
                        <div className={styles.logoAndName}>
                            <img src={logoImg} alt="Logo CoopLedger" className={styles.logo} />
                            <span className={styles.brandName}>CoopLedger</span>
                        </div>
                        <p className={styles.description}>
                            Le registre infalsifiable et décentralisé pour la traçabilité et la gouvernance transparente des coopératives.
                        </p>
                    </div>
                    
                    {/* Liens et informations */}
                    <div className={styles.linksGroup}>
                        
                        {/* Navigation */}
                        <div className={styles.linkColumn}>
                            <h4 className={styles.columnTitle}>Navigation</h4>
                            <a href="/" className={styles.link}>Accueil</a>
                            <a href="/livre" className={styles.link}>Livre</a>
                            <a href="/vote" className={styles.link}>Vote</a>
                            <a href="/profile" className={styles.link}>Profil</a>
                        </div>
                        
                        {/* Liens légaux */}
                        <div className={styles.linkColumn}>
                            <h4 className={styles.columnTitle}>Légal</h4>
                            <a href="/confidentialite" className={styles.link}>Confidentialité</a>
                            <a href="/conditions" className={styles.link}>Conditions d'utilisation</a>
                            <a href="/mentions-legales" className={styles.link}>Mentions Légales</a>
                        </div>
                        
                        {/* Contact */}
                        <div className={styles.linkColumn}>
                            <h4 className={styles.columnTitle}>Contact</h4>
                            <address className={styles.address}>
                                <span className={styles.contactText}>contact@coopledger.com</span>
                                <span className={styles.contactText}>+228 23 45 67 89</span>
                                <span className={styles.contactText}>Lomé, Togo</span>
                            </address>
                        </div>

                    </div>
                </div>
                
                {/* Barre inférieure */}
                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        &copy; {new Date().getFullYear()} CoopLedger. Tous droits réservés.
                    </p>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;
import farmImg from '../../assets/images/farm.png';
import React from 'react';
import styles from './features.module.css';
import { Landmark, QrCode, Vote, Users } from 'lucide-react'; 

const Features = () => {
    return (
        <section className={styles.wrapper}>
            <div className={`${styles.container} container`}>
                
                {/* En-tête de la section */}
                <header className={styles.header}>
                    <h2 className={styles.title}>Un registre infalsifiable</h2>
                    <p className={styles.subtitle}>
                        CoopLedger utilise la blockchain pour transformer chaque graine semée en une donnée certifiée et partagée.
                    </p>
                </header>

                {/* Bento Grid Layout */}
                <div className={styles.grid}>
                    
                    {/* CARTE 1: TRANSACTIONS (Vert - Large) */}
                    <article className={`${styles.card} ${styles.cardGreen}`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconWrapper}>
                                <Landmark size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className={styles.cardTitle}>Transactions Immobiles</h3>
                        </div>
                        <p className={styles.cardText}>
                            Chaque franc investi est tracé, de l'achat des semences à la vente de la récolte.
                        </p>
                    </article>

                    {/* CARTE 2: VOTES (Bleu - Étroite) */}
                    <article className={`${styles.card} ${styles.cardBlue}`}>
                        {/* Icône + Titre */}
                        <div className={styles.cardHeaderBlue}>
                            <div className={styles.iconWrapperBlue}>
                                <Vote size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className={styles.voteMainTitle}>Votes Certifiés</h3>
                        </div>
                        
                        {/* Conteneur des résultats de vote */}
                        <div className={styles.voteResults}>
                            {/* Ligne Oui */}
                            <div className={styles.voteRow}>
                                <span className={styles.voteLabel}>Oui</span>
                                <div className={styles.voteBarContainer}>
                                    <div className={styles.voteBarFill} style={{ width: '88%' }}></div>
                                </div>
                                <span className={styles.votePercentage}>88%</span>
                            </div>
                            
                            {/* Ligne Non */}
                            <div className={styles.voteRow}>
                                <span className={styles.voteLabel}>Non</span>
                                <div className={styles.voteBarContainer}>
                                    <div className={styles.voteBarFill} style={{ width: '12%' }}></div>
                                </div>
                                <span className={styles.votePercentage}>12%</span>
                            </div>
                        </div>
                        
                        {/* Légende en bas */}
                        <p className={styles.voteCaption}>
                            Gouvernance démocratique avec résultats cryptographiques.
                        </p>
                    </article>

                    {/* CARTE 3: QR CODE (Terre - Étroite) */}
                    <article className={`${styles.card} ${styles.cardBeige}`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconWrapperBeige}>
                                <QrCode size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className={styles.cardTitleBeige}>Traçabilité par qr code</h3>
                        </div>
                        <p className={styles.cardTextBeige}>
                            Scannez pour voir l'origine exacte du produit.
                        </p>
                    </article>

                    {/* CARTE 4: COLLECTIF (Blanc - Large) */}
                    <article className={`${styles.card} ${styles.cardWhite}`}>
                        <div className={styles.cardSplit}>
                            <div className={styles.splitContent}>
                                {/* Icône + Titre */}
                                <div className={styles.cardHeaderWhite}>
                                    <div className={styles.iconWrapperWhite}>
                                        <Users size={28} strokeWidth={1.5} />
                                    </div>
                                    <h3 className={styles.cardTitleWhite}>La force du collectif</h3>
                                </div>
                                <p className={styles.cardTextWhite}>
                                    Plus de 150 coopératives déjà intégrées dans le registre national sécurisé.
                                </p>
                            </div>
                            <div className={styles.splitImage}>
                                <img 
                                    src={farmImg}
                                    alt="Champ de la coopérative" 
                                    className={styles.image} 
                                />
                            </div>
                        </div>
                    </article>

                </div>
            </div>
        </section>
    );
};

export default Features;
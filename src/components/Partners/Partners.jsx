import React from 'react';
import styles from './partners.module.css';

// Importez vos images de logos ici (ajustez les chemins si nécessaire)
import logo1 from '../../assets/logos/blason_rt.png';
import logo2 from '../../assets/logos/ifad_logo.png';
import logo3 from '../../assets/logos/giz_logo.png';

const Partners = () => {
    const partnersList = [
        { name: "Ministère de l'Agriculture", logo: logo1 },
        { name: "IFAD", logo: logo2 },
        { name: "GIZ", logo: logo3 }
    ];

    return (
        <section className={styles.wrapper}>
            <div className={`${styles.container} container`}>
                
                {/* En-tête de section */}
                <header className={styles.header}>
                    <h2 className={styles.title}>Ils nous font confiance</h2>
                    <p className={styles.subtitle}>
                        Des institutions et coopératives qui soutiennent notre engagement vers une traçabilité transparente.
                    </p>
                </header>

                {/* Grille des partenaires */}
                <div className={styles.grid}>
                    {partnersList.map((partner, index) => (
                        <div key={index} className={styles.card}>
                            <img 
                                src={partner.logo} 
                                alt={partner.name} 
                                className={styles.logo} 
                            />
                            <span className={styles.name}>{partner.name}</span>
                        </div>
                    ))}
                </div>
                
            </div>
        </section>
    );
};

export default Partners;
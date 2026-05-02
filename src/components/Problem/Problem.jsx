import React from 'react';
import styles from './problem.module.css'; // Import des styles modulaires
import { EyeOff, AlertTriangle } from 'lucide-react'; // Utilisation de Lucide comme dans votre App.js

const Problem = () => {
    // Données des points de douleur pour une structure itérative propre
    const painPoints = [
        {
            icon: EyeOff,
            title: "Manque de Traçabilité",
            description: "Les flux financiers traditionnels sont souvent perdus dans des registres papier obsolètes."
        },
        {
            icon: AlertTriangle,
            title: "Conflits de Gouvernance",
            description: "Des décisions arbitraires sans consensus clair des membres de la coopérative."
        }
    ];

    return (
        // Utilisation de la classe utilitaire globale .container pour le centrage et le padding latéral
        <section id="problem" className={`${styles.problemSection} container`}>
            
            {/* Colonne de Gauche : Texte et Points */}
            <div className={styles.textContent}>
                <span className={styles.overtitle}>LE CONSTAT</span>
                
                {/* H2 avec police Serif selon globals.css */}
                <h2 className={styles.mainTitle}>
                    L'opacité freine<br/> votre croissance
                </h2>
                
                {/* Liste des points de douleur */}
                <div className={styles.painPointsList}>
                    {painPoints.map((point, index) => {
                        const IconComponent = point.icon;
                        return (
                            <div key={index} className={styles.painPointItem}>
                                {/* Conteneur de l'icône avec fond subtil rouge (danger) */}
                                <div className={styles.iconWrapper}>
                                    <IconComponent className={styles.painIcon} strokeWidth={1.5} />
                                </div>
                                <div className={styles.painText}>
                                    <h3 className={styles.painTitle}>{point.title}</h3>
                                    <p className={styles.painDescription}>{point.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Colonne de Droite : Carte de Visualisation */}
            <div className={styles.visualContent}>
                {/* Utilisation explicite des tokens de rayon et d'ombre de carte */}
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        {/* Utilisation directe du token de couleur sémantique --color-danger */}
                        <div className={styles.statNumber} style={{ color: 'var(--color-danger)' }}>
                            42%
                        </div>
                        <div className={styles.statLabel}>PERTES DE REVENUS</div>
                    </div>
                    
                    {/* Visualisation des barres (simplifiée pour l'intégration web) */}
                    <div className={styles.barChartVisual}>
                        <div className={`${styles.bar} ${styles.bar1}`}></div>
                        <div className={`${styles.bar} ${styles.bar2}`}></div>
                        <div className={`${styles.bar} ${styles.bar3}`}></div>
                    </div>
                    
                    <p className={styles.visualLegend}>
                        Visualisation des flux de capitaux non-digitalisés dans les systèmes traditionnels.
                    </p>
                    
                    {/* Indicateur visuel rouge vertical sur le côté (comme sur l'image) */}
                    <div className={styles.dangerIndicator}></div>
                </div>
            </div>
            
        </section>
    );
};

export default Problem;
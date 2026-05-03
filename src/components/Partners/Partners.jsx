import React from 'react';
import styles from './partners.module.css';

import logo1 from '../../assets/logos/blason_rt.png';
import logo2 from '../../assets/logos/ifad_logo.png';
import logo3 from '../../assets/logos/giz_logo.png';

const Partners = () => {
    const partnersList = [
        {
            name: "Ministère de l'Agriculture",
            logo: logo1,
            role: "Partenaire institutionnel",
        },
        {
            name: "IFAD",
            logo: logo2,
            role: "Financement agricole international",
        },
        {
            name: "GIZ",
            logo: logo3,
            role: "Appui technique & gouvernance",
        },
    ];

    return (
        <section className={styles.wrapper}>
            <div className={`${styles.inner} container`}>

                <header className={styles.header}>
                    <span className={styles.overline}>Partenaires</span>
                    <h2 className={styles.title}>Ils soutiennent<br />la transparence agricole</h2>
                    <p className={styles.subtitle}>
                        La GIZ accompagne déjà 115 coopératives togolaises sur la gouvernance. 
                        L'IFAD documente que les coopératives transparentes lèvent 3× plus de financements. 
                        CoopLedger leur fournit l'infrastructure qu'ils cherchent.
                    </p>
                </header>

                <div className={styles.grid}>
                    {partnersList.map((p, i) => (
                        <div key={i} className={styles.card}>
                            <img src={p.logo} alt={p.name} className={styles.logo} />
                            <div className={styles.info}>
                                <span className={styles.name}>{p.name}</span>
                                <span className={styles.role}>{p.role}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Partners;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './hero.module.css';
import Button from '../UI/Button/Button';
import { ArrowRight, ShieldCheck, TrendingUp, Users } from 'lucide-react';

function Hero() {
    const navigate = useNavigate();

    const handleLoginRedirect = () => navigate('/login');

    const handleDownloadPdf = () => {
        const link = document.createElement('a');
        link.href = '/documents/CoopLedger_TG28_Documentation_Phase1.pdf';
        link.download = 'documentation_coopledger.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className={styles.hero}>
            <div className={styles.bg_grid} aria-hidden="true" />
            <div className={styles.bg_glow} aria-hidden="true" />

            <div className={styles.container}>
{/*                 Badge contextuel — sans mention hackathon
                <div className={styles.badge}>
                    <span className={styles.badge_dot} />
                    Registre agricole · Blockchain Togo
                </div> */}

                <h1 className={styles.title}>
                    La gouvernance des<br />
                    coopératives agricoles,<br />
                    <em className={styles.accent}>enfin traçable</em>
                </h1>

                <p className={styles.description}>
                    CoopLedger permettra à chaque coopérative togolaise d'enregistrer ses 
                    transactions, de voter ses décisions et de rendre ses comptes — 
                    sur une blockchain publique que personne ne pourra falsifier.
                </p>

                <div className={styles.cta_row}>
                    <Button variant="primary" size="lg" onClick={handleLoginRedirect}>
                        Découvrir la plateforme
                    </Button>
                    <Button variant="outline" size="lg" onClick={handleDownloadPdf} icon={ArrowRight} iconPosition='right'>
                        En savoir plus
                    </Button>
                </div>

                {/* Statistiques — chiffres réels du contexte togolais */}
                <div className={styles.stats_row}>
                    <div className={styles.stat}>
                        <span className={styles.stat_value}>0,2&nbsp;%</span>
                        <span className={styles.stat_label}>
                            des crédits bancaires<br />accordés à l'agriculture
                        </span>
                    </div>
                    <div className={styles.stat_divider} />
                    <div className={styles.stat}>
                        <span className={styles.stat_value}>9&nbsp;800+</span>
                        <span className={styles.stat_label}>
                            coopératives agricoles<br />enregistrées au Togo
                        </span>
                    </div>
                    <div className={styles.stat_divider} />
                    <div className={styles.stat}>
                        <span className={styles.stat_value}>65&nbsp;%</span>
                        <span className={styles.stat_label}>
                            de la population active<br />vit de l'agriculture
                        </span>
                    </div>
                </div>

                {/* Trois promesses concrètes */}
                <div className={styles.proof_row}>
                    <div className={styles.proof_card}>
                        <ShieldCheck size={24} className={styles.proof_icon} />
                        <p>Des transactions inscrites sur la blockchain — impossibles à effacer ou modifier</p>
                    </div>
                    <div className={styles.proof_card}>
                        <TrendingUp size={24} className={styles.proof_icon} />
                        <p>Un accès au financement facilité grâce à une gestion vérifiable par tous</p>
                    </div>
                    <div className={styles.proof_card}>
                        <Users size={24} className={styles.proof_icon} />
                        <p>Des votes certifiés pour que chaque membre ait vraiment son mot à dire</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
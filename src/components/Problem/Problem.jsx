import React from 'react';
import styles from './problem.module.css';
import { EyeOff, XCircle, AlertTriangle } from 'lucide-react';

const painPoints = [
    {
        icon: EyeOff,
        label: 'Opacité financière',
        description:
            'Les recettes et dépenses ne sont jamais communiquées aux membres. Aucun agriculteur ne peut vérifier comment ses fonds sont utilisés ni contester une décision.',
    },
    {
        icon: XCircle,
        label: 'Décisions sans consultation',
        description:
            'Le président ou le trésorier décide seul. Le principe fondateur "un membre, une voix" reste lettre morte faute de mécanisme de vote traçable.',
    },
    {
        icon: AlertTriangle,
        label: 'Exclusion du crédit bancaire',
        description:
            "L'APBEF Togo le documente : les banques refusent de financer les coopératives précisément parce qu'elles ne peuvent pas retracer l'utilisation des fonds.",
    },
];

const Problem = () => {
    return (
        <section id="probleme" className={`${styles.section} container`}>

            <div className={styles.left}>
                <span className={styles.overline}>Le constat</span>
                <h2 className={styles.title}>
                    L'opacité coûte cher<br />aux agriculteurs togolais
                </h2>
                <p className={styles.intro}>
                    Entre 2011 et 2017, l'agriculture togolaise — qui représente 40&nbsp;% du PIB 
                    et emploie 65&nbsp;% de la population active — n'a reçu que{' '}
                    <strong>0,2&nbsp;%</strong> des crédits bancaires. Raison documentée par le 
                    Ministère de l'Économie : l'impossibilité de retracer la gestion des fonds des coopératives.
                </p>

                <div className={styles.pain_list}>
                    {painPoints.map((point, i) => {
                        const Icon = point.icon;
                        return (
                            <div key={i} className={styles.pain_item}>
                                <div className={styles.icon_wrap}>
                                    <Icon size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className={styles.pain_title}>{point.label}</h3>
                                    <p className={styles.pain_desc}>{point.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.data_card}>
                    <div className={styles.card_top}>
                        <div className={styles.big_number}>0,2&nbsp;%</div>
                        <p className={styles.number_label}>des crédits bancaires togolais accordés à l'agriculture</p>
                        <p className={styles.number_source}>Source : Ministère de l'Économie du Togo, 2017</p>
                    </div>

                    <div className={styles.context_rows}>
                        <div className={styles.context_row}>
                            <span className={styles.context_label}>Agriculture / PIB national</span>
                            <div className={styles.bar_wrap}>
                                <div className={styles.bar}>
                                    <div className={styles.bar_fill} style={{ width: '40%', background: 'var(--color-brand)' }} />
                                </div>
                                <span className={styles.bar_val}>40&nbsp;%</span>
                            </div>
                        </div>
                        <div className={styles.context_row}>
                            <span className={styles.context_label}>Population active employée</span>
                            <div className={styles.bar_wrap}>
                                <div className={styles.bar}>
                                    <div className={styles.bar_fill} style={{ width: '65%', background: 'var(--color-brand)' }} />
                                </div>
                                <span className={styles.bar_val}>65&nbsp;%</span>
                            </div>
                        </div>
                        <div className={styles.context_row}>
                            <span className={styles.context_label}>Crédits bancaires reçus</span>
                            <div className={styles.bar_wrap}>
                                <div className={styles.bar}>
                                    <div className={styles.bar_fill} style={{ width: '0.5%', background: 'var(--color-danger)' }} />
                                </div>
                                <span className={styles.bar_val} style={{ color: 'var(--color-danger)' }}>0,2&nbsp;%</span>
                            </div>
                        </div>
                    </div>

                    <blockquote className={styles.quote}>
                        <AlertTriangle size={24} className={styles.quote_icon} />
                        « Le secteur agricole est confronté à un manque d'organisation des coopératives, 
                        réduisant les financements pouvant leur être accordés. »
                        <cite>— République Togolaise (officiel), MIFA</cite>
                    </blockquote>
                </div>
            </div>
        </section>
    );
};

export default Problem;
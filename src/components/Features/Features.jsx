import React from 'react';
import styles from './features.module.css';
import { Landmark, Vote, QrCode, Users, Lock, ChevronRight } from 'lucide-react';

const Features = () => {
    return (
        <section className={styles.wrapper}>
            <div className={`${styles.inner} container`}>

                {/* En-tête */}
                <header className={styles.header}>
                    <span className={styles.overline}>La solution</span>
                    <h2 className={styles.title}>Un registre infalsifiable,<br />par construction</h2>
                    <p className={styles.subtitle}>
                        CoopLedger déploie deux smart contracts sur Polygon : <code>CoopTresorerie.sol</code> 
                        et <code>CoopVote.sol</code>. Chaque franc, chaque vote, chaque décision — immuables.
                    </p>
                </header>

                {/* Grille bento */}
                <div className={styles.grid}>

                    {/* CARTE 1 — Transactions (large, sombre) */}
                    <article className={`${styles.card} ${styles.card_dark}`}>
                        <div className={styles.card_icon_wrap_dark}>
                            <Landmark size={24} strokeWidth={1.5} />
                        </div>
                        <h3 className={styles.card_title_light}>Transactions immuables</h3>
                        <p className={styles.card_text_light}>
                            Chaque franc investi — cotisation, achat d'intrants, prime distribuée — 
                            est inscrit sur la blockchain Polygon avec son montant, sa date et 
                            l'identité de l'initiateur. Ni le trésorier, ni le président ne peut 
                            l'effacer ou le modifier.
                        </p>
                        <div className={styles.tx_preview}>
                            <div className={styles.tx_row}>
                                <span className={styles.tx_type}>Cotisation</span>
                                <span className={styles.tx_amount + ' ' + styles.tx_green}>+15 000 FCFA</span>
                            </div>
                            <div className={styles.tx_row}>
                                <span className={styles.tx_type}>Achat semences</span>
                                <span className={styles.tx_amount + ' ' + styles.tx_red}>−42 500 FCFA</span>
                            </div>
                            <div className={styles.tx_row}>
                                <span className={styles.tx_type}>Prime récolte</span>
                                <span className={styles.tx_amount + ' ' + styles.tx_green}>+88 200 FCFA</span>
                            </div>
                            <div className={styles.tx_row}>
                                <span className={styles.tx_type}>Dépense logistique</span>
                                <span className={styles.tx_amount + ' ' + styles.tx_red}>−12 000 FCFA</span>
                            </div>
                        </div>
                        <div className={styles.badge_on_chain}>
                            <Lock size={10} />
                            Enregistré on-chain · Polygon
                        </div>
                    </article>

                    {/* CARTE 2 — Vote (bleu) */}
                    <article className={`${styles.card} ${styles.card_blue}`}>
                        <div className={styles.card_icon_wrap_blue}>
                            <Vote size={24} strokeWidth={1.5} />
                        </div>
                        <h3 className={styles.card_title_blue}>Votes certifiés</h3>
                        <p className={styles.card_text_blue}>
                            Toute dépense dépassant le seuil déclenche un vote obligatoire. 
                            Le smart contract bloque la transaction jusqu'au résultat.
                        </p>
                        <div className={styles.vote_block}>
                            <div className={styles.vote_row}>
                                <span className={styles.vote_label_blue}>Oui</span>
                                <div className={styles.vote_bar_bg}>
                                    <div className={styles.vote_bar_fill} style={{ width: '88%' }} />
                                </div>
                                <span className={styles.vote_pct}>88&nbsp;%</span>
                            </div>
                            <div className={styles.vote_row}>
                                <span className={styles.vote_label_blue}>Non</span>
                                <div className={styles.vote_bar_bg}>
                                    <div className={styles.vote_bar_fill} style={{ width: '12%', opacity: 0.35 }} />
                                </div>
                                <span className={styles.vote_pct}>12&nbsp;%</span>
                            </div>
                        </div>
                        <p className={styles.vote_caption}>Exécution automatique par smart contract</p>
                    </article>


                    {/* CARTE 4 — Impact chiffré (blanc) */}
                    <article className={`${styles.card} ${styles.card_light}`}>
                        <div className={styles.card_icon_wrap_light}>
                            <Users size={24} strokeWidth={1.5} />
                        </div>
                        <h3 className={styles.card_title}>La transparence ouvre le financement</h3>
                        <p className={styles.card_text}>
                            Avec CoopLedger, chaque banque, chaque partenaire — IFAD, GIZ, 
                            Ministère de l'Agriculture — peut vérifier en temps réel la rigueur 
                            de gestion d'une coopérative.
                        </p>
                        <div className={styles.impact_stats}>
                            <div className={styles.impact_stat}>
                                <span className={styles.impact_val}>3×</span>
                                <span className={styles.impact_lbl}>plus de financement externe<br/>(IFAD, 2022)</span>
                            </div>
                        </div>
                    </article>

                </div>
            </div>
        </section>
    );
};

export default Features;
import React from 'react';
import { 
    Users, 
    ShieldCheck, 
    TrendingUp, 
    ArrowUpRight, 
    Activity, 
    FileText 
} from 'lucide-react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const stats = [
        { title: "Coopérateurs Actifs", value: "42", subtext: "+4 ce mois-ci", trend: 5.2, icon: Users },
        { title: "Certificats Émis", value: "1,204", subtext: "Total vérifiés", trend: 12.5, icon: ShieldCheck },
        { title: "Volume / Tonnes", value: "320.5", subtext: "Total récolté", trend: -1.4, icon: TrendingUp },
        { title: "Transactions", value: "148", subtext: "En attente: 12", icon: FileText }
    ];

    const recentTransactions = [
        { id: "#TX-8921", coop: "Coopérative Avé", type: "Vente de Cacao", amount: "12,500,000 CFA", status: "Validé", date: "02 Mai 2026" },
        { id: "#TX-8920", coop: "Coopérative Kpalimé", type: "Café Équitable", amount: "4,300,000 CFA", status: "En cours", date: "01 Mai 2026" },
        { id: "#TX-8919", coop: "Coopérative Kara", type: "Soja", amount: "8,120,000 CFA", status: "Validé", date: "29 Avril 2026" }
    ];

    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.mainContent}>
                <DashboardHeader 
                    title="Tableau de bord" 
                    subtitle="Suivez les activités et les performances de vos coopératives." 
                />

                {/* Section des cartes de statistiques */}
                <section className={styles.statsGrid}>
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.cardTitle}>{stat.title}</span>
                                    <div className={styles.iconWrapper}>
                                        <Icon size={18} />
                                    </div>
                                </div>
                                <div className={styles.cardBody}>
                                    <h3 className={styles.cardValue}>{stat.value}</h3>
                                    {stat.trend && (
                                        <span className={`${styles.trend} ${stat.trend > 0 ? styles.positive : styles.negative}`}>
                                            <ArrowUpRight size={14} />
                                            {stat.trend}%
                                        </span>
                                    )}
                                </div>
                                <p className={styles.cardSubtext}>{stat.subtext}</p>
                            </div>
                        );
                    })}
                </section>

                {/* Section principale : Graphique et Tableau */}
                <div className={styles.contentGrid}>
                    <div className={styles.cardWide}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Aperçu des Performances</h2>
                            <p className={styles.sectionSubtitle}>Évolution des volumes de produits agricoles (T) - 2026</p>
                        </div>
                        <div className={styles.chartPlaceholder}>
                            <Activity size={32} color="var(--color-brand)" />
                            <p>Graphique des rendements (Recharts / Chart.js)</p>
                        </div>
                    </div>

                    <div className={styles.cardWide}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Transactions Récentes</h2>
                            <p className={styles.sectionSubtitle}>Dernières opérations enregistrées sur la plateforme</p>
                        </div>
                        
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>ID Transaction</th>
                                        <th>Coopérative</th>
                                        <th>Produit / Type</th>
                                        <th>Montant</th>
                                        <th>Statut</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTransactions.map((tx, index) => (
                                        <tr key={index}>
                                            <td>{tx.id}</td>
                                            <td><strong>{tx.coop}</strong></td>
                                            <td>{tx.type}</td>
                                            <td>{tx.amount}</td>
                                            <td>
                                                <span className={`${styles.badge} ${tx.status === 'Validé' ? styles.badgeSuccess : styles.badgeWarning}`}>
                                                    {tx.status}
                                                </span>
                                            </td>
                                            <td>{tx.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
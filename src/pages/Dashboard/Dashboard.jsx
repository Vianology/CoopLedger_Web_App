import React from 'react';
import { 
    Landmark, 
    FileCheck, 
    BarChart3, 
    DollarSign, 
    ArrowUpRight, 
    Clock, 
    Plus, 
    Download, 
    Search,
    Filter,
    ShieldCheck,
    Building2
} from 'lucide-react';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import Button from '../../components/UI/Button/Button';
import InputField from '../../components/UI/InputField/InputField';
import SelectField from '../../components/UI/SelectField/SelectField';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const stats = [
        { 
            label: "Coopératives partenaires", 
            value: "48", 
            icon: Landmark, 
            change: "+12% ce mois", 
            trend: "up" 
        },
        { 
            label: "Volume tracé (T)", 
            value: "1 250", 
            icon: FileCheck, 
            change: "+8% ce mois", 
            trend: "up" 
        },
        { 
            label: "Rendement moyen", 
            value: "89%", 
            icon: BarChart3, 
            change: "+4.5% ce mois", 
            trend: "up" 
        },
        { 
            label: "Revenus estimés", 
            value: "45 M FCFA", 
            icon: DollarSign, 
            change: "+15% ce mois", 
            trend: "up" 
        }
    ];

    return (
        <AppLayout>
            <div className={styles.dashboardWrapper}>
                {/* En-tête de la vue Dashboard avec Barre d'outils et Boutons */}
                <div className={styles.toolbar}>
                    <div className={styles.searchAndFilter}>
                        <InputField
                            label="Recherche"
                            placeholder="Rechercher une coopérative, un lot..."
                            icon={Search}
                            type="text"
                        />
                        <SelectField
                            label="Filtre"
                            icon={Filter}
                         
                            options={[
                                { value: 'all', label: 'Toutes les régions' },
                                { value: 'ma', label: 'Région maritime' },
                                { value: 'pt', label: 'Région des plateaux' },
                                { value: 'ce', label: 'Région centrale' },
                                { value: 'ka', label: 'Région de la kara' },
                                { value: 'sa', label: 'Région des savanes' },
                            ]}
                        />
                    </div>
                    <div className={styles.actionButtons}>
                        <Button variant="primary" icon={Plus} size="lg">
                            Nouvelle coopérative
                        </Button>
                        <Button variant="outline" icon={Download} size="lg">
                            Exporter
                        </Button>
                    </div>
                </div>

                {/* Cartes de statistiques (KPIs) */}
                <section className={styles.statsGrid}>
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.iconWrapper}>
                                        <Icon size={20} />
                                    </div>
                                    <span className={styles.changeRate}>
                                        {stat.change}
                                        <ArrowUpRight size={14} />
                                    </span>
                                </div>
                                <div className={styles.cardBody}>
                                    <span className={styles.cardLabel}>{stat.label}</span>
                                    <h3 className={styles.cardValue}>{stat.value}</h3>
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* Section principale avec une grille déséquilibrée (60% / 40%) */}
                <div className={styles.layoutGrid}>
                    {/* Colonne principale : Analyse des rendements (graphiques) */}
                    <div className={styles.panel}>
                        <div className={styles.panelHeader}>
                            <div>
                                <h3 className={styles.panelTitle}>Analyse des rendements</h3>
                                <p className={styles.panelSubtitle}>Comparatif des volumes de production par catégorie (en tonnes)</p>
                            </div>
                        </div>
                        
                        <div className={styles.chartContainer}>
                            <div className={styles.chartBar} style={{ height: '65%' }}>
                                <span className={styles.barValue}>65%</span>
                                <span className={styles.barLabel}>Cacao</span>
                            </div>
                            <div className={styles.chartBar} style={{ height: '40%' }}>
                                <span className={styles.barValue}>40%</span>
                                <span className={styles.barLabel}>Café</span>
                            </div>
                            <div className={styles.chartBar} style={{ height: '85%' }}>
                                <span className={styles.barValue}>85%</span>
                                <span className={styles.barLabel}>Riz</span>
                            </div>
                            <div className={styles.chartBar} style={{ height: '55%' }}>
                                <span className={styles.barValue}>55%</span>
                                <span className={styles.barLabel}>Anacarde</span>
                            </div>
                        </div>
                    </div>

                    {/* Colonne secondaire : Activités récentes */}
                    <div className={styles.panel}>
                        <div className={styles.panelHeader}>
                            <h3 className={styles.panelTitle}>Activités récentes</h3>
                            <p className={styles.panelSubtitle}>Dernières actions enregistrées</p>
                        </div>
                        
                        <ul className={styles.activityList}>
                            <li className={styles.activityItem}>
                                <span className={styles.dot} />
                                <div className={styles.activityContent}>
                                    <p className={styles.activityText}>Enregistrement de lot - Coopérative Nyamata</p>
                                    <span className={styles.activityTime}>
                                        <Clock size={12} /> Il y a 20 minutes
                                    </span>
                                </div>
                            </li>
                            <li className={styles.activityItem}>
                                <span className={styles.dot} />
                                <div className={styles.activityContent}>
                                    <p className={styles.activityText}>Validation du contrat de traçabilité</p>
                                    <span className={styles.activityTime}>
                                        <Clock size={12} /> Il y a 2 heures
                                    </span>
                                </div>
                            </li>
                            <li className={styles.activityItem}>
                                <span className={styles.dot} />
                                <div className={styles.activityContent}>
                                    <p className={styles.activityText}>Nouvelle adhésion (GIZ)</p>
                                    <span className={styles.activityTime}>
                                        <Clock size={12} /> Il y a 5 heures
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
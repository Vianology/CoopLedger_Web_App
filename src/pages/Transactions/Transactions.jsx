import React, { useState } from 'react';
import { 
    Search, 
    Download, 
    ArrowUpRight, 
    ArrowDownLeft, 
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    Filter
} from 'lucide-react';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import styles from './Transactions.module.css';
import Button from '../../components/UI/Button/Button';
import InputField from '../../components/UI/InputField/InputField';
import SelectField from '../../components/UI/SelectField/SelectField';

const Transactions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all'); // Filtre sur les types (Revenu / Dépense)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Données de démonstration
    const transactions = [
        {
            id: 1,
            title: 'Vente de cacao certifié',
            category: 'Coopérative Avrankou',
            date: '02 Mai 2026, 10:15',
            reference: 'TX-897123',
            status: 'Réussi',
            amount: 1250000,
            icon: ArrowUpRight,
            type: 'income'
        },
        {
            id: 2,
            title: 'Achat de matériel agricole',
            category: 'Fournisseur AgriStore',
            date: '30 Avril 2026, 14:45',
            reference: 'TX-897102',
            status: 'En attente',
            amount: -450000,
            icon: ArrowDownLeft,
            type: 'expense'
        },
        {
            id: 3,
            title: 'Subvention - Campagne',
            category: 'Gouvernement',
            date: '28 Avril 2026, 09:00',
            reference: 'TX-896999',
            status: 'Réussi',
            amount: 5000000,
            icon: ArrowUpRight,
            type: 'income'
        },
        {
            id: 4,
            title: 'Frais de transport',
            category: 'Logistique Express',
            date: '25 Avril 2026, 11:20',
            reference: 'TX-896845',
            status: 'Réussi',
            amount: -75000,
            icon: ArrowDownLeft,
            type: 'expense'
        },
        {
            id: 5,
            title: 'Vente de café',
            category: 'Coopérative Danyi',
            date: '22 Avril 2026, 16:30',
            reference: 'TX-896521',
            status: 'Réussi',
            amount: 850000,
            icon: ArrowUpRight,
            type: 'income'
        }
    ];

    // Filtrage des transactions
    const filteredTransactions = transactions.filter(tx => {
        const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              tx.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              tx.reference.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
        const matchesType = typeFilter === 'all' || tx.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    // Pagination
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

    return (
        <AppLayout>
            <div className={styles.wrapper}>
                {/* Statistiques rapides */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Volume total des transactions</span>
                        <span className={styles.statValue}>7 550 000 FCFA</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Revenus de la période</span>
                        <span className={styles.statValue} style={{ color: '#10b981' }}>+ 7 100 000 FCFA</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Dépenses de la période</span>
                        <span className={styles.statValue} style={{ color: '#ef4444' }}>- 525 000 FCFA</span>
                    </div>
                </div>

                {/* Barre d'outils */}
                <div className={styles.toolbar}>
                    <div className={styles.searchAndFilter}>
                        <InputField
                            label="Recherche"
                            placeholder="Rechercher une transaction..."
                            icon={Search}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />

                        {/* Filtre sur le statut */}
                        <SelectField
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            label="Status"
                            icon={Filter}
                            options={[
                                { value: 'all', label: 'Tous les status' },
                                { value: 'Réussi', label: 'Réussi' },
                                { value: 'En attente', label: 'En attente' },
                            ]}
                        />

                        {/* Filtre sur le type (Revenu/Dépense) */}
                        <SelectField
                            value={typeFilter}
                            onChange={(e) => {
                                setTypeFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            label="Type"
                            icon={Filter}
                            options={[
                                { value: 'all', label: 'Tous les types' },
                                { value: 'income', label: 'Revenus' },
                                { value: 'expense', label: 'Dépenses' },
                            ]}
                        />
                    </div>

                    <div className={styles.actionButtons}>
                        <Button variant="outline" icon={Download} size="lg">
                            Exporter
                        </Button>
                    </div>
                </div>

                {/* Tableau */}
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.colDesc}>Description</th>
                                <th className={styles.colDate}>Date & Heure</th>
                                <th className={styles.colRef}>Référence</th>
                                <th className={styles.colStatus}>Statut</th>
                                <th className={styles.colAmount}>Montant</th>
                                <th className={styles.colAction}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedTransactions.length > 0 ? (
                                paginatedTransactions.map((tx) => (
                                    <tr key={tx.id}>
                                        <td className={styles.colDesc}>
                                            <div className={styles.txDescription}>
                                                <div className={`${styles.txIcon} ${tx.amount >= 0 ? styles.positive : styles.negative}`}>
                                                    <tx.icon size={16} />
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: 'var(--fw-medium)', display: 'block' }}>{tx.title}</span>
                                                    <span className={styles.textSecondary}>{tx.category}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={styles.colDate}>
                                            <span className={styles.textSecondary}>{tx.date}</span>
                                        </td>
                                        <td className={styles.colRef}>
                                            <span className={styles.monoText}>{tx.reference}</span>
                                        </td>
                                        <td className={styles.colStatus}>
                                            <span className={`${styles.statusBadge} ${tx.status === 'Réussi' ? styles.statusSuccess : styles.statusWarning}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className={styles.colAmount}>
                                            <span className={`${styles.txAmount} ${tx.amount >= 0 ? styles.textPositive : styles.textNegative}`}>
                                                {tx.amount >= 0 ? `+${tx.amount.toLocaleString()} FCFA` : `${tx.amount.toLocaleString()} FCFA`}
                                            </span>
                                        </td>
                                        <td className={styles.colAction}>
                                            <button className={styles.iconButton} aria-label="Voir les détails">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-secondary)' }}>
                                        Aucune transaction trouvée.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className={styles.paginationFooter}>
                        <span className={styles.pageIndicator}>
                            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} sur {filteredTransactions.length} transactions
                        </span>
                        <div className={styles.paginationControls}>
                            <button
                                className={styles.navBtn}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className={styles.pageIndicator}>
                                Page {currentPage} sur {totalPages || 1}
                            </span>
                            <button
                                className={styles.navBtn}
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Transactions;
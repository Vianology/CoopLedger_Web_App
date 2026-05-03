import React, { useState } from 'react';
import {
    CheckCircle2,
    XCircle,
    Clock,
    ChevronRight,
    Plus,
    Users,
    Wallet,
    ShoppingCart,
    Wrench,
    Sprout,
    TrendingUp,
    AlertTriangle,
    Lock,
    Unlock,
    X,
    Check,
    BarChart2,
    FileText,
    Calendar,
    Hash,
    Filter,
} from 'lucide-react';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import Button from '../../components/UI/Button/Button';
import styles from './Votes.module.css';

/* ─────────────────────────────────────────────
   Données de démonstration
───────────────────────────────────────────── */
const INITIAL_PROPOSALS = [
    {
        id: 'PROP-001',
        title: "Achat de semences certifiées — Campagne 2026",
        description: "Acquisition de 500 kg de semences de maïs certifiées auprès de l'ITRA pour la campagne agricole principale. Ce lot couvre les besoins de 48 membres pour un rendement estimé à 85%.",
        category: 'achat',
        amount: 1250000,
        author: 'AGBENONWOSSI Olivier',
        authorRole: 'Trésorier',
        createdAt: '28 Avril 2026',
        deadline: '05 Mai 2026',
        status: 'active',
        totalMembers: 12,
        votes: {
            oui: [
                { id: 1, initials: 'AO', name: 'A. Olivier' },
                { id: 2, initials: 'KM', name: 'K. Mensah' },
                { id: 3, initials: 'DF', name: 'D. Foli' },
                { id: 4, initials: 'AK', name: 'A. Koffi' },
                { id: 5, initials: 'YT', name: 'Y. Tché' },
                { id: 6, initials: 'BN', name: 'B. Nana' },
                { id: 7, initials: 'EK', name: 'E. Koko' },
            ],
            non: [
                { id: 8, initials: 'RG', name: 'R. Gnon' },
            ],
        },
        userVoted: null,
        txHash: null,
        smartContract: 'CoopVote.sol',
    },
    {
        id: 'PROP-002',
        title: "Réparation du tracteur communautaire",
        description: "Prise en charge des frais de révision complète du tracteur John Deere 5055E utilisé collectivement. Devis validé par le mécanicien agréé SOGEMA de Lomé.",
        category: 'maintenance',
        amount: 450000,
        author: 'KODJO Messan',
        authorRole: 'Président',
        createdAt: '01 Mai 2026',
        deadline: '06 Mai 2026',
        status: 'active',
        totalMembers: 12,
        votes: {
            oui: [
                { id: 1, initials: 'AO', name: 'A. Olivier' },
                { id: 2, initials: 'KM', name: 'K. Mensah' },
                { id: 3, initials: 'DF', name: 'D. Foli' },
            ],
            non: [
                { id: 4, initials: 'RG', name: 'R. Gnon' },
                { id: 5, initials: 'BN', name: 'B. Nana' },
            ],
        },
        userVoted: null,
        txHash: null,
        smartContract: 'CoopVote.sol',
    },
    {
        id: 'PROP-003',
        title: "Formation certifiante — Gestion coopérative",
        description: "Financement d'une session de formation de 3 jours pour 5 membres en comptabilité coopérative, organisée par l'ICAT. Transport et hébergement inclus.",
        category: 'formation',
        amount: 175000,
        author: 'FOLI Dédé',
        authorRole: 'Membre',
        createdAt: '25 Avril 2026',
        deadline: '03 Mai 2026',
        status: 'approved',
        totalMembers: 12,
        votes: {
            oui: [
                { id: 1, initials: 'AO', name: 'A. Olivier' },
                { id: 2, initials: 'KM', name: 'K. Mensah' },
                { id: 3, initials: 'DF', name: 'D. Foli' },
                { id: 4, initials: 'AK', name: 'A. Koffi' },
                { id: 5, initials: 'YT', name: 'Y. Tché' },
                { id: 6, initials: 'BN', name: 'B. Nana' },
                { id: 7, initials: 'EK', name: 'E. Koko' },
                { id: 8, initials: 'RG', name: 'R. Gnon' },
                { id: 9, initials: 'SA', name: 'S. Agbo' },
                { id: 10, initials: 'TL', name: 'T. Lalle' },
                { id: 11, initials: 'CM', name: 'C. Mawuli' },
                { id: 12, initials: 'JK', name: 'J. Klutse' },
            ],
            non: [],
        },
        userVoted: 'oui',
        txHash: '0x4a7f...3c91',
        smartContract: 'CoopVote.sol',
    },
    {
        id: 'PROP-004',
        title: "Achat d'engrais — Stock trimestriel",
        description: "Commande groupée de 2 tonnes d'engrais NPK 15-15-15 auprès du distributeur Agritech Togo. Prix négocié en vrac avec réduction de 18% par rapport au tarif unitaire.",
        category: 'achat',
        amount: 820000,
        author: 'AGBENONWOSSI Olivier',
        authorRole: 'Trésorier',
        createdAt: '20 Avril 2026',
        deadline: '27 Avril 2026',
        status: 'rejected',
        totalMembers: 12,
        votes: {
            oui: [
                { id: 1, initials: 'AO', name: 'A. Olivier' },
                { id: 2, initials: 'KM', name: 'K. Mensah' },
                { id: 3, initials: 'DF', name: 'D. Foli' },
                { id: 4, initials: 'AK', name: 'A. Koffi' },
            ],
            non: [
                { id: 5, initials: 'YT', name: 'Y. Tché' },
                { id: 6, initials: 'BN', name: 'B. Nana' },
                { id: 7, initials: 'EK', name: 'E. Koko' },
                { id: 8, initials: 'RG', name: 'R. Gnon' },
                { id: 9, initials: 'SA', name: 'S. Agbo' },
                { id: 10, initials: 'TL', name: 'T. Lalle' },
                { id: 11, initials: 'CM', name: 'C. Mawuli' },
                { id: 12, initials: 'JK', name: 'J. Klutse' },
            ],
        },
        userVoted: 'non',
        txHash: '0x8b2e...7d44',
        smartContract: 'CoopVote.sol',
    },
];

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const CATEGORY_CONFIG = {
    achat:       { icon: ShoppingCart, label: 'Achat',       color: '#6366f1' },
    maintenance: { icon: Wrench,       label: 'Maintenance', color: '#f59e0b' },
    formation:   { icon: TrendingUp,   label: 'Formation',   color: '#10b981' },
    projet:      { icon: Sprout,       label: 'Projet',      color: '#3b82f6' },
    autre:       { icon: FileText,     label: 'Autre',       color: '#8b5cf6' },
};

const STATUS_CONFIG = {
    active:   { label: 'En cours',  color: 'var(--color-brand)',  bg: 'var(--color-brand-subtle)' },
    approved: { label: 'Approuvé', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    rejected: { label: 'Rejeté',   color: '#ef4444', bg: 'rgba(239,68,68,0.1)'  },
};

function formatAmount(n) {
    return n.toLocaleString('fr-FR') + ' FCFA';
}

function getVotePercent(votes) {
    const total = votes.oui.length + votes.non.length;
    if (!total) return { oui: 0, non: 0, total: 0 };
    return {
        oui: Math.round((votes.oui.length / total) * 100),
        non: Math.round((votes.non.length / total) * 100),
        total,
    };
}

function getParticipation(votes, totalMembers) {
    return votes.oui.length + votes.non.length;
}

/* ─────────────────────────────────────────────
   Modal de vote
───────────────────────────────────────────── */
const VoteModal = ({ proposal, onClose, onVote }) => {
    const [choice, setChoice] = useState(null);
    const [confirming, setConfirming] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const percent = getVotePercent(proposal.votes);
    const CatIcon = CATEGORY_CONFIG[proposal.category]?.icon || FileText;

    const handleConfirm = () => {
        setConfirming(true);
        setTimeout(() => {
            setConfirmed(true);
            setTimeout(() => {
                onVote(proposal.id, choice);
                onClose();
            }, 1200);
        }, 800);
    };

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.modalHeader}>
                    <div className={styles.modalMeta}>
                        <span className={styles.modalId}>{proposal.id}</span>
                        <span className={styles.modalCategory} style={{ color: CATEGORY_CONFIG[proposal.category]?.color }}>
                            <CatIcon size={13} />
                            {CATEGORY_CONFIG[proposal.category]?.label}
                        </span>
                    </div>
                    <button className={styles.modalClose} onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <h2 className={styles.modalTitle}>{proposal.title}</h2>
                <p className={styles.modalDesc}>{proposal.description}</p>

                {/* Infos clés */}
                <div className={styles.modalInfoGrid}>
                    <div className={styles.modalInfoItem}>
                        <Wallet size={14} />
                        <div>
                            <span className={styles.modalInfoLabel}>Montant</span>
                            <span className={styles.modalInfoValue}>{formatAmount(proposal.amount)}</span>
                        </div>
                    </div>
                    <div className={styles.modalInfoItem}>
                        <Calendar size={14} />
                        <div>
                            <span className={styles.modalInfoLabel}>Échéance</span>
                            <span className={styles.modalInfoValue}>{proposal.deadline}</span>
                        </div>
                    </div>
                    <div className={styles.modalInfoItem}>
                        <Users size={14} />
                        <div>
                            <span className={styles.modalInfoLabel}>Participants</span>
                            <span className={styles.modalInfoValue}>{getParticipation(proposal.votes, proposal.totalMembers)} / {proposal.totalMembers}</span>
                        </div>
                    </div>
                    <div className={styles.modalInfoItem}>
                        <Lock size={14} />
                        <div>
                            <span className={styles.modalInfoLabel}>Contrat</span>
                            <span className={styles.modalInfoValue}>{proposal.smartContract}</span>
                        </div>
                    </div>
                </div>

                {/* Résultats en temps réel */}
                <div className={styles.modalResults}>
                    <div className={styles.modalResultsHeader}>
                        <BarChart2 size={14} />
                        <span>Résultats en temps réel</span>
                        <span className={styles.liveTag}>
                            <span className={styles.liveDot} />
                            Live · Blockchain
                        </span>
                    </div>
                    <div className={styles.resultBars}>
                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>OUI</span>
                            <div className={styles.resultBarTrack}>
                                <div className={styles.resultBarFill} style={{ width: `${percent.oui}%`, background: '#10b981' }} />
                            </div>
                            <span className={styles.resultCount}>{proposal.votes.oui.length} <small>({percent.oui}%)</small></span>
                        </div>
                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>NON</span>
                            <div className={styles.resultBarTrack}>
                                <div className={styles.resultBarFill} style={{ width: `${percent.non}%`, background: '#ef4444' }} />
                            </div>
                            <span className={styles.resultCount}>{proposal.votes.non.length} <small>({percent.non}%)</small></span>
                        </div>
                    </div>
                </div>

                {/* Choix */}
                {!confirmed ? (
                    <>
                        <div className={styles.voteChoices}>
                            <button
                                className={`${styles.choiceBtn} ${styles.choiceOui} ${choice === 'oui' ? styles.choiceSelected : ''}`}
                                onClick={() => setChoice('oui')}
                                disabled={confirming}
                            >
                                <Check size={20} />
                                <span>OUI</span>
                                <small>J'approuve</small>
                            </button>
                            <button
                                className={`${styles.choiceBtn} ${styles.choiceNon} ${choice === 'non' ? styles.choiceSelected : ''}`}
                                onClick={() => setChoice('non')}
                                disabled={confirming}
                            >
                                <X size={20} />
                                <span>NON</span>
                                <small>Je refuse</small>
                            </button>
                        </div>

                        <div className={styles.blockchainNotice}>
                            <Lock size={13} />
                            <span>Vote immuable — Une fois confirmé, votre vote est enregistré sur Polygon et ne peut pas être modifié.</span>
                        </div>

                        <button
                            className={styles.confirmBtn}
                            disabled={!choice || confirming}
                            onClick={handleConfirm}
                        >
                            {confirming ? (
                                <span className={styles.confirmingState}>
                                    <span className={styles.spinner} />
                                    Enregistrement sur la blockchain...
                                </span>
                            ) : (
                                <>
                                    <Lock size={15} />
                                    Confirmer mon vote
                                </>
                            )}
                        </button>
                    </>
                ) : (
                    <div className={styles.confirmedState}>
                        <div className={styles.confirmedIcon}>
                            <CheckCircle2 size={32} />
                        </div>
                        <span>Vote enregistré sur Polygon</span>
                        <small>Transaction en cours de validation...</small>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   Modal nouvelle proposition
───────────────────────────────────────────── */
const NewProposalModal = ({ onClose, onSubmit }) => {
    const [form, setForm] = useState({ title: '', description: '', category: 'achat', amount: '' });

    const handleSubmit = () => {
        if (!form.title || !form.amount) return;
        onSubmit(form);
        onClose();
    };

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle} style={{ margin: 0 }}>Nouvelle proposition</h2>
                    <button className={styles.modalClose} onClick={onClose}><X size={18} /></button>
                </div>

                <p className={styles.modalDesc}>
                    Soumettez une proposition à l'ensemble des membres. Elle sera automatiquement mise au vote sur la blockchain.
                </p>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Titre de la proposition</label>
                    <input
                        className={styles.formInput}
                        placeholder="Ex: Achat d'engrais NPK pour la campagne..."
                        value={form.title}
                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Description</label>
                    <textarea
                        className={styles.formTextarea}
                        placeholder="Décrivez l'objectif, le fournisseur, la quantité, la justification..."
                        rows={4}
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Catégorie</label>
                        <select
                            className={styles.formSelect}
                            value={form.category}
                            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                        >
                            {Object.entries(CATEGORY_CONFIG).map(([key, { label }]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Montant (FCFA)</label>
                        <input
                            className={styles.formInput}
                            type="number"
                            placeholder="Ex: 500000"
                            value={form.amount}
                            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                        />
                    </div>
                </div>

                <div className={styles.blockchainNotice}>
                    <Unlock size={13} />
                    <span>Cette proposition sera publiée sur Polygon via <strong>CoopVote.sol</strong> et tous les membres seront notifiés.</span>
                </div>

                <button
                    className={styles.confirmBtn}
                    disabled={!form.title || !form.amount}
                    onClick={handleSubmit}
                >
                    <Sprout size={15} />
                    Soumettre au vote
                </button>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   Carte de proposition
───────────────────────────────────────────── */
const ProposalCard = ({ proposal, onVoteClick }) => {
    const percent = getVotePercent(proposal.votes);
    const participation = getParticipation(proposal.votes, proposal.totalMembers);
    const participationRate = Math.round((participation / proposal.totalMembers) * 100);
    const CatIcon = CATEGORY_CONFIG[proposal.category]?.icon || FileText;
    const catColor = CATEGORY_CONFIG[proposal.category]?.color;
    const statusCfg = STATUS_CONFIG[proposal.status];
    const isActive = proposal.status === 'active';
    const hasVoted = !!proposal.userVoted;

    return (
        <div className={`${styles.card} ${!isActive ? styles.cardClosed : ''}`}>
            {/* Header */}
            <div className={styles.cardTop}>
                <div className={styles.cardMeta}>
                    <span className={styles.cardCategory} style={{ color: catColor, background: `${catColor}18` }}>
                        <CatIcon size={12} />
                        {CATEGORY_CONFIG[proposal.category]?.label}
                    </span>
                    <span className={styles.cardId}>
                        <Hash size={11} />
                        {proposal.id}
                    </span>
                </div>
                <span className={styles.statusBadge} style={{ color: statusCfg.color, background: statusCfg.bg }}>
                    {proposal.status === 'active' && <span className={styles.pulseDot} />}
                    {statusCfg.label}
                </span>
            </div>

            {/* Titre + montant */}
            <h3 className={styles.cardTitle}>{proposal.title}</h3>
            <div className={styles.cardAmount}>
                <Wallet size={14} />
                {formatAmount(proposal.amount)}
            </div>

            {/* Barre de vote */}
            <div className={styles.voteBar}>
                <div className={styles.voteBarInner}>
                    <div
                        className={styles.voteBarOui}
                        style={{ width: `${percent.oui}%` }}
                        title={`OUI: ${percent.oui}%`}
                    />
                    <div
                        className={styles.voteBarNon}
                        style={{ width: `${percent.non}%` }}
                        title={`NON: ${percent.non}%`}
                    />
                </div>
                <div className={styles.voteBarLabels}>
                    <span className={styles.voteOui}>
                        <CheckCircle2 size={12} /> {proposal.votes.oui.length} OUI
                    </span>
                    <span className={styles.voteNon}>
                        <XCircle size={12} /> {proposal.votes.non.length} NON
                    </span>
                </div>
            </div>

            {/* Participation + deadline */}
            <div className={styles.cardFooter}>
                <div className={styles.cardFooterLeft}>
                    <div className={styles.avatarStack}>
                        {[...proposal.votes.oui, ...proposal.votes.non].slice(0, 5).map((v, i) => (
                            <span key={i} className={styles.avatarSmall} style={{ zIndex: 5 - i }} title={v.name}>
                                {v.initials}
                            </span>
                        ))}
                        {participation > 5 && (
                            <span className={styles.avatarSmall} style={{ zIndex: 0 }}>+{participation - 5}</span>
                        )}
                    </div>
                    <span className={styles.participationText}>{participation}/{proposal.totalMembers} votants</span>
                </div>
                <div className={styles.deadlineChip}>
                    <Clock size={11} />
                    {proposal.status === 'active' ? `Jusqu'au ${proposal.deadline}` : proposal.deadline}
                </div>
            </div>

            {/* Infos blockchain si clôturé */}
            {proposal.txHash && (
                <div className={styles.txHashRow}>
                    <Lock size={11} />
                    <span className={styles.txHash}>{proposal.txHash}</span>
                    <span className={styles.txConfirmed}>Confirmé</span>
                </div>
            )}

            {/* Action */}
            {isActive && (
                <button
                    className={`${styles.voteBtn} ${hasVoted ? styles.voteBtnDone : ''}`}
                    onClick={() => !hasVoted && onVoteClick(proposal)}
                    disabled={hasVoted}
                >
                    {hasVoted ? (
                        <>
                            <CheckCircle2 size={15} />
                            Voté · {proposal.userVoted.toUpperCase()}
                        </>
                    ) : (
                        <>
                            Voter maintenant
                            <ChevronRight size={15} />
                        </>
                    )}
                </button>
            )}

            {!isActive && (
                <div className={styles.closedResult}>
                    {proposal.status === 'approved' ? (
                        <><CheckCircle2 size={15} /> Proposition approuvée à {percent.oui}%</>
                    ) : (
                        <><XCircle size={15} /> Proposition rejetée à {percent.non}%</>
                    )}
                </div>
            )}
        </div>
    );
};

/* ─────────────────────────────────────────────
   Page Votes
───────────────────────────────────────────── */
const Votes = () => {
    const [proposals, setProposals] = useState(INITIAL_PROPOSALS);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [showNewModal, setShowNewModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');

    const handleVote = (proposalId, choice) => {
        setProposals(prev => prev.map(p => {
            if (p.id !== proposalId) return p;
            const newVoter = { id: 99, initials: 'AO', name: 'A. Olivier' };
            return {
                ...p,
                userVoted: choice,
                txHash: '0x' + Math.random().toString(16).slice(2, 6) + '...' + Math.random().toString(16).slice(2, 6),
                votes: {
                    oui: choice === 'oui' ? [...p.votes.oui, newVoter] : p.votes.oui,
                    non: choice === 'non' ? [...p.votes.non, newVoter] : p.votes.non,
                },
            };
        }));
    };

    const handleNewProposal = (form) => {
        const newProposal = {
            id: `PROP-00${proposals.length + 1}`,
            title: form.title,
            description: form.description,
            category: form.category,
            amount: parseInt(form.amount),
            author: 'AGBENONWOSSI Olivier',
            authorRole: 'Trésorier',
            createdAt: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
            deadline: new Date(Date.now() + 7 * 86400000).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
            status: 'active',
            totalMembers: 12,
            votes: { oui: [], non: [] },
            userVoted: null,
            txHash: null,
            smartContract: 'CoopVote.sol',
        };
        setProposals(prev => [newProposal, ...prev]);
    };

    const filtered = proposals.filter(p =>
        filterStatus === 'all' || p.status === filterStatus
    );

    // Stats
    const activeCount   = proposals.filter(p => p.status === 'active').length;
    const approvedCount = proposals.filter(p => p.status === 'approved').length;
    const rejectedCount = proposals.filter(p => p.status === 'rejected').length;
    const pendingVote   = proposals.filter(p => p.status === 'active' && !p.userVoted).length;

    return (
        <AppLayout>
            <div className={styles.wrapper}>

                {/* ── En-tête de page ── */}
                <div className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.pageTitle}>Votes & Propositions</h1>
                        <p className={styles.pageSubtitle}>
                            Chaque décision financière est soumise au vote de tous les membres via smart contract.
                        </p>
                    </div>
                    <Button variant="primary" icon={Plus} size="md" onClick={() => setShowNewModal(true)}>
                        Nouvelle proposition
                    </Button>
                </div>

                {/* ── KPIs ── */}
                <div className={styles.statsRow}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: 'rgba(62,174,130,0.12)', color: 'var(--color-brand)' }}>
                            <Clock size={18} />
                        </div>
                        <div>
                            <span className={styles.statValue}>{activeCount}</span>
                            <span className={styles.statLabel}>En cours</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                            <CheckCircle2 size={18} />
                        </div>
                        <div>
                            <span className={styles.statValue}>{approvedCount}</span>
                            <span className={styles.statLabel}>Approuvées</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                            <XCircle size={18} />
                        </div>
                        <div>
                            <span className={styles.statValue}>{rejectedCount}</span>
                            <span className={styles.statLabel}>Rejetées</span>
                        </div>
                    </div>
                    <div className={`${styles.statCard} ${pendingVote > 0 ? styles.statCardAlert : ''}`}>
                        <div className={styles.statIcon} style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>
                            <AlertTriangle size={18} />
                        </div>
                        <div>
                            <span className={styles.statValue}>{pendingVote}</span>
                            <span className={styles.statLabel}>En attente de mon vote</span>
                        </div>
                    </div>
                </div>

                {/* ── Filtres ── */}
                <div className={styles.filters}>
                    <Filter size={14} />
                    {[
                        { key: 'all',      label: 'Toutes' },
                        { key: 'active',   label: 'En cours' },
                        { key: 'approved', label: 'Approuvées' },
                        { key: 'rejected', label: 'Rejetées' },
                    ].map(f => (
                        <button
                            key={f.key}
                            className={`${styles.filterBtn} ${filterStatus === f.key ? styles.filterBtnActive : ''}`}
                            onClick={() => setFilterStatus(f.key)}
                        >
                            {f.label}
                            <span className={styles.filterCount}>
                                {f.key === 'all' ? proposals.length : proposals.filter(p => p.status === f.key).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* ── Grille de propositions ── */}
                {filtered.length > 0 ? (
                    <div className={styles.grid}>
                        {filtered.map(proposal => (
                            <ProposalCard
                                key={proposal.id}
                                proposal={proposal}
                                onVoteClick={setSelectedProposal}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <Sprout size={40} />
                        <span>Aucune proposition dans cette catégorie</span>
                    </div>
                )}

                {/* ── Notice blockchain ── */}
                <div className={styles.blockchainFooter}>
                    <Lock size={13} />
                    <span>Tous les votes sont enregistrés de façon immuable sur <strong>Polygon</strong> via <strong>CoopVote.sol</strong>. Aucun vote ne peut être modifié ou supprimé.</span>
                </div>
            </div>

            {/* Modals */}
            {selectedProposal && (
                <VoteModal
                    proposal={selectedProposal}
                    onClose={() => setSelectedProposal(null)}
                    onVote={handleVote}
                />
            )}
            {showNewModal && (
                <NewProposalModal
                    onClose={() => setShowNewModal(false)}
                    onSubmit={handleNewProposal}
                />
            )}
        </AppLayout>
    );
};

export default Votes;
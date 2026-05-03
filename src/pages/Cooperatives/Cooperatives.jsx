import React, { useState } from 'react';
import {
    Search,
    Plus,
    Download,
    MapPin,
    Users,
    TrendingUp,
    Wallet,
    ChevronRight,
    X,
    Filter,
    Sprout,
    ShieldCheck,
    Clock,
    BarChart2,
    Phone,
    Mail,
    Hash,
    Building2,
    CheckCircle2,
    AlertTriangle,
    ArrowUpRight,
    Layers,
    Star,
    CalendarDays,
    Wheat,
} from 'lucide-react';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import Button from '../../components/UI/Button/Button';
import styles from './Cooperatives.module.css';

/* ─────────────────────────────────────────────
   Données
───────────────────────────────────────────── */
const COOPERATIVES = [
    {
        id: 'COOP-001',
        name: 'Coopérative Avrankou',
        region: 'Région Maritime',
        ville: 'Avrankou',
        president: 'MENSAH Koffi',
        tresorier: 'AGBO Séna',
        phone: '+228 91 23 45 67',
        email: 'coop.avrankou@coopledger.tg',
        membres: 48,
        cultures: ['Cacao', 'Café'],
        surfaceHa: 124,
        anneeFondation: 2018,
        status: 'active',
        certifiee: true,
        rendement: 87,
        revenusMois: 4200000,
        volumeTonne: 312,
        transactions: 142,
        lastActivity: 'Il y a 20 min',
        txHash: '0x4a7f...3c91',
        score: 94,
        historique: [65, 70, 72, 80, 85, 87],
        description: 'Coopérative pionnière dans la région maritime, spécialisée dans la culture du cacao certifié bio. Partenaire IFAD depuis 2021.',
    },
    {
        id: 'COOP-002',
        name: 'Coopérative Danyi',
        region: 'Région des Plateaux',
        ville: 'Danyi-Apéyémé',
        president: 'FOLI Mawuli',
        tresorier: 'KOFFI Ama',
        phone: '+228 93 45 67 89',
        email: 'coop.danyi@coopledger.tg',
        membres: 34,
        cultures: ['Café', 'Igname'],
        surfaceHa: 89,
        anneeFondation: 2020,
        status: 'active',
        certifiee: true,
        rendement: 79,
        revenusMois: 2850000,
        volumeTonne: 198,
        transactions: 87,
        lastActivity: 'Il y a 2h',
        txHash: '0x8b2e...7d44',
        score: 81,
        historique: [55, 60, 65, 70, 72, 79],
        description: 'Coopérative des hauts plateaux togolais, reconnue pour la qualité de son café arabica. Label équitable en cours d\'obtention.',
    },
    {
        id: 'COOP-003',
        name: 'Coopérative Nyamata',
        region: 'Région Centrale',
        ville: 'Sokodé',
        president: 'TCHALLA Abou',
        tresorier: 'LATEVI Rose',
        phone: '+228 90 12 34 56',
        email: 'coop.nyamata@coopledger.tg',
        membres: 62,
        cultures: ['Riz', 'Mil', 'Sorgho'],
        surfaceHa: 215,
        anneeFondation: 2016,
        status: 'active',
        certifiee: false,
        rendement: 91,
        revenusMois: 5100000,
        volumeTonne: 487,
        transactions: 203,
        lastActivity: 'Il y a 5h',
        txHash: '0x2c9a...1f55',
        score: 96,
        historique: [75, 80, 82, 86, 89, 91],
        description: 'La plus grande coopérative céréalière du centre du Togo. Équipée d\'un tracteur communautaire et d\'un silo de stockage moderne.',
    },
    {
        id: 'COOP-004',
        name: 'Coopérative Kara Nord',
        region: 'Région de la Kara',
        ville: 'Kara',
        president: 'BOUKARI Issa',
        tresorier: 'NANDJA Fatima',
        phone: '+228 94 56 78 90',
        email: 'coop.karanord@coopledger.tg',
        membres: 27,
        cultures: ['Anacarde', 'Sésame'],
        surfaceHa: 73,
        anneeFondation: 2022,
        status: 'warning',
        certifiee: false,
        rendement: 58,
        revenusMois: 980000,
        volumeTonne: 89,
        transactions: 34,
        lastActivity: 'Il y a 3 jours',
        txHash: '0x7d3f...9e22',
        score: 53,
        historique: [40, 45, 50, 52, 55, 58],
        description: 'Coopérative en développement spécialisée dans la cajou. Accompagnement technique ICAT en cours pour améliorer les rendements.',
    },
    {
        id: 'COOP-005',
        name: 'Coopérative Savanes Vertes',
        region: 'Région des Savanes',
        ville: 'Dapaong',
        president: 'GNON Baré',
        tresorier: 'LALLE Tiyenti',
        phone: '+228 92 34 56 78',
        email: 'coop.savanes@coopledger.tg',
        membres: 41,
        cultures: ['Sorgho', 'Arachide', 'Coton'],
        surfaceHa: 156,
        anneeFondation: 2019,
        status: 'active',
        certifiee: true,
        rendement: 83,
        revenusMois: 3450000,
        volumeTonne: 267,
        transactions: 118,
        lastActivity: 'Hier',
        txHash: '0x5a1c...4b87',
        score: 88,
        historique: [60, 65, 70, 76, 80, 83],
        description: 'Coopérative polyvalente du nord togolais. Pionnière dans l\'intégration du coton biologique et forte implication féminine (60% de membres).',
    },
    {
        id: 'COOP-006',
        name: 'Coopérative Bas-Mono',
        region: 'Région Maritime',
        ville: 'Tabligbo',
        president: 'AGBENOU Akpé',
        tresorier: 'DOSSOU Céleste',
        phone: '+228 96 78 90 12',
        email: 'coop.basmono@coopledger.tg',
        membres: 19,
        cultures: ['Maïs', 'Manioc'],
        surfaceHa: 47,
        anneeFondation: 2023,
        status: 'inactive',
        certifiee: false,
        rendement: 42,
        revenusMois: 410000,
        volumeTonne: 54,
        transactions: 12,
        lastActivity: 'Il y a 2 semaines',
        txHash: null,
        score: 38,
        historique: [30, 35, 38, 40, 41, 42],
        description: 'Jeune coopérative créée en 2023, en phase de structuration. Besoins identifiés en formation et en accès au financement.',
    },
];

const STATUS_CONFIG = {
    active:   { label: 'Active',    color: '#10b981', bg: 'rgba(16,185,129,0.10)' },
    warning:  { label: 'À suivre',  color: '#f59e0b', bg: 'rgba(245,158,11,0.10)' },
    inactive: { label: 'Inactive',  color: '#94a3b8', bg: 'rgba(148,163,184,0.10)' },
};

const REGION_COLORS = {
    'Région Maritime':      '#6366f1',
    'Région des Plateaux':  '#10b981',
    'Région Centrale':      '#f59e0b',
    'Région de la Kara':    '#ef4444',
    'Région des Savanes':   '#8b5cf6',
};

function formatAmount(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + ' M FCFA';
    return n.toLocaleString('fr-FR') + ' FCFA';
}

/* ─────────────────────────────────────────────
   Mini sparkline SVG
───────────────────────────────────────────── */
const Sparkline = ({ data, color = '#10b981' }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const w = 80, h = 28;
    const points = data.map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / (max - min || 1)) * h;
        return `${x},${y}`;
    }).join(' ');
    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
            <polyline points={points} stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            <circle cx={points.split(' ').pop().split(',')[0]} cy={points.split(' ').pop().split(',')[1]} r="3" fill={color} />
        </svg>
    );
};

/* ─────────────────────────────────────────────
   Score badge
───────────────────────────────────────────── */
const ScoreBadge = ({ score }) => {
    const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
    return (
        <div className={styles.scoreBadge} style={{ '--score-color': color }}>
            <svg viewBox="0 0 36 36" className={styles.scoreRing}>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeOpacity=".1" strokeWidth="3" />
                <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke={color} strokeWidth="3"
                    strokeDasharray={`${score} 100`}
                    strokeLinecap="round"
                    transform="rotate(-90 18 18)"
                />
            </svg>
            <span className={styles.scoreValue} style={{ color }}>{score}</span>
        </div>
    );
};

/* ─────────────────────────────────────────────
   Drawer de détail
───────────────────────────────────────────── */
const CoopDrawer = ({ coop, onClose }) => {
    const statusCfg = STATUS_CONFIG[coop.status];
    const regionColor = REGION_COLORS[coop.region] || 'var(--color-brand)';

    return (
        <>
            <div className={styles.drawerBackdrop} onClick={onClose} aria-hidden="true" />
            <aside className={styles.drawer} aria-label={`Détail — ${coop.name}`}>
                {/* Header */}
                <div className={styles.drawerHeader}>
                    <div className={styles.drawerHeaderLeft}>
                        <div className={styles.drawerAvatar} style={{ background: `${regionColor}20`, color: regionColor }}>
                            <Sprout size={22} />
                        </div>
                        <div>
                            <h2 className={styles.drawerTitle}>{coop.name}</h2>
                            <span className={styles.drawerSub}>
                                <MapPin size={12} /> {coop.ville} · {coop.region}
                            </span>
                        </div>
                    </div>
                    <button className={styles.drawerClose} onClick={onClose} aria-label="Fermer">
                        <X size={18} />
                    </button>
                </div>

                {/* Badges */}
                <div className={styles.drawerBadges}>
                    <span className={styles.statusPill} style={{ color: statusCfg.color, background: statusCfg.bg }}>
                        <span className={styles.statusDot} style={{ background: statusCfg.color }} />
                        {statusCfg.label}
                    </span>
                    {coop.certifiee && (
                        <span className={styles.certPill}>
                            <ShieldCheck size={12} /> Certifiée
                        </span>
                    )}
                    <span className={styles.idPill}>
                        <Hash size={11} /> {coop.id}
                    </span>
                </div>

                {/* Description */}
                <p className={styles.drawerDesc}>{coop.description}</p>

                {/* Score + Sparkline */}
                <div className={styles.drawerScoreRow}>
                    <div className={styles.drawerScoreBlock}>
                        <ScoreBadge score={coop.score} />
                        <div>
                            <span className={styles.drawerScoreLabel}>Score de gouvernance</span>
                            <span className={styles.drawerScoreHint}>Sur 100 pts · Blockchain verified</span>
                        </div>
                    </div>
                    <div className={styles.drawerSparkBlock}>
                        <span className={styles.drawerSparkLabel}>Rendement 6 mois</span>
                        <Sparkline
                            data={coop.historique}
                            color={coop.rendement >= 80 ? '#10b981' : coop.rendement >= 60 ? '#f59e0b' : '#ef4444'}
                        />
                        <span className={styles.drawerSparkValue}>{coop.rendement}%</span>
                    </div>
                </div>

                {/* KPIs */}
                <div className={styles.drawerKpis}>
                    {[
                        { icon: Users,      label: 'Membres',    value: coop.membres,                       unit: '' },
                        { icon: Wallet,     label: 'Ce mois',    value: formatAmount(coop.revenusMois),     unit: '' },
                        { icon: Layers,     label: 'Volume',     value: `${coop.volumeTonne} T`,            unit: '' },
                        { icon: Sprout,     label: 'Surface',    value: `${coop.surfaceHa} ha`,             unit: '' },
                        { icon: BarChart2,  label: 'Tx totales', value: coop.transactions,                  unit: '' },
                        { icon: CalendarDays, label: 'Fondée en', value: coop.anneeFondation,               unit: '' },
                    ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className={styles.drawerKpi}>
                            <Icon size={15} />
                            <span className={styles.drawerKpiValue}>{value}</span>
                            <span className={styles.drawerKpiLabel}>{label}</span>
                        </div>
                    ))}
                </div>

                {/* Cultures */}
                <div className={styles.drawerSection}>
                    <div className={styles.drawerSectionTitle}><Wheat size={14} /> Cultures</div>
                    <div className={styles.cultureTags}>
                        {coop.cultures.map(c => (
                            <span key={c} className={styles.cultureTag}>{c}</span>
                        ))}
                    </div>
                </div>

                {/* Responsables */}
                <div className={styles.drawerSection}>
                    <div className={styles.drawerSectionTitle}><Users size={14} /> Responsables</div>
                    <div className={styles.memberList}>
                        {[
                            { name: coop.president, role: 'Président' },
                            { name: coop.tresorier, role: 'Trésorier' },
                        ].map(({ name, role }) => (
                            <div key={role} className={styles.memberItem}>
                                <span className={styles.memberAvatar}>
                                    {name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                                </span>
                                <div>
                                    <span className={styles.memberName}>{name}</span>
                                    <span className={styles.memberRole}>{role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div className={styles.drawerSection}>
                    <div className={styles.drawerSectionTitle}><Phone size={14} /> Contact</div>
                    <div className={styles.contactList}>
                        <a href={`tel:${coop.phone}`} className={styles.contactItem}>
                            <Phone size={13} /> {coop.phone}
                        </a>
                        <a href={`mailto:${coop.email}`} className={styles.contactItem}>
                            <Mail size={13} /> {coop.email}
                        </a>
                    </div>
                </div>

                {/* Blockchain */}
                {coop.txHash && (
                    <div className={styles.drawerSection}>
                        <div className={styles.drawerSectionTitle}><ShieldCheck size={14} /> Dernière tx blockchain</div>
                        <div className={styles.txRow}>
                            <span className={styles.txHash}>{coop.txHash}</span>
                            <span className={styles.txConfirmed}><CheckCircle2 size={12} /> Confirmée · Polygon</span>
                        </div>
                    </div>
                )}

                {/* Dernière activité */}
                <div className={styles.drawerFooterMeta}>
                    <Clock size={12} />
                    <span>Dernière activité : {coop.lastActivity}</span>
                </div>

                {/* Actions */}
                <div className={styles.drawerActions}>
                    <Button variant="primary" icon={ArrowUpRight} size="md">
                        Voir les transactions
                    </Button>
                    <Button variant="outline" icon={BarChart2} size="md">
                        Rapport complet
                    </Button>
                </div>
            </aside>
        </>
    );
};

/* ─────────────────────────────────────────────
   Carte coopérative
───────────────────────────────────────────── */
const CoopCard = ({ coop, onClick }) => {
    const statusCfg = STATUS_CONFIG[coop.status];
    const regionColor = REGION_COLORS[coop.region] || 'var(--color-brand)';

    return (
        <div className={styles.card} onClick={() => onClick(coop)}>
            {/* Top */}
            <div className={styles.cardTop}>
                <div className={styles.cardAvatar} style={{ background: `${regionColor}18`, color: regionColor }}>
                    <Sprout size={18} />
                </div>
                <div className={styles.cardTopRight}>
                    <span className={styles.statusPill} style={{ color: statusCfg.color, background: statusCfg.bg }}>
                        <span className={styles.statusDot} style={{ background: statusCfg.color }} />
                        {statusCfg.label}
                    </span>
                    {coop.certifiee && (
                        <span className={styles.certIcon} title="Certifiée">
                            <ShieldCheck size={14} />
                        </span>
                    )}
                </div>
            </div>

            {/* Nom + lieu */}
            <div>
                <h3 className={styles.cardName}>{coop.name}</h3>
                <span className={styles.cardLocation}>
                    <MapPin size={11} /> {coop.ville} · {coop.region}
                </span>
            </div>

            {/* Cultures */}
            <div className={styles.cultureTags}>
                {coop.cultures.slice(0, 3).map(c => (
                    <span key={c} className={styles.cultureTag}>{c}</span>
                ))}
            </div>

            {/* Stats inline */}
            <div className={styles.cardStats}>
                <div className={styles.cardStat}>
                    <Users size={13} />
                    <span>{coop.membres} membres</span>
                </div>
                <div className={styles.cardStat}>
                    <TrendingUp size={13} />
                    <span>{coop.rendement}% rdt</span>
                </div>
                <div className={styles.cardStat}>
                    <Wallet size={13} />
                    <span>{formatAmount(coop.revenusMois)}</span>
                </div>
            </div>

            {/* Sparkline + score */}
            <div className={styles.cardBottom}>
                <Sparkline
                    data={coop.historique}
                    color={coop.rendement >= 80 ? '#10b981' : coop.rendement >= 60 ? '#f59e0b' : '#ef4444'}
                />
                <div className={styles.cardBottomRight}>
                    <ScoreBadge score={coop.score} />
                    <ChevronRight size={15} className={styles.cardChevron} />
                </div>
            </div>

            {/* Dernière activité */}
            <div className={styles.cardActivity}>
                <Clock size={11} />
                <span>{coop.lastActivity}</span>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   Page principale
───────────────────────────────────────────── */
const Cooperatives = () => {
    const [search, setSearch] = useState('');
    const [regionFilter, setRegionFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedCoop, setSelectedCoop] = useState(null);

    const regions = [...new Set(COOPERATIVES.map(c => c.region))];

    const filtered = COOPERATIVES.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.ville.toLowerCase().includes(search.toLowerCase()) ||
            c.cultures.some(cu => cu.toLowerCase().includes(search.toLowerCase()));
        const matchRegion = regionFilter === 'all' || c.region === regionFilter;
        const matchStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchSearch && matchRegion && matchStatus;
    });

    // KPIs globaux
    const totalMembres  = COOPERATIVES.reduce((s, c) => s + c.membres, 0);
    const totalRevenu   = COOPERATIVES.reduce((s, c) => s + c.revenusMois, 0);
    const totalVolume   = COOPERATIVES.reduce((s, c) => s + c.volumeTonne, 0);
    const avgRendement  = Math.round(COOPERATIVES.reduce((s, c) => s + c.rendement, 0) / COOPERATIVES.length);

    return (
        <AppLayout>
            <div className={styles.wrapper}>

                {/* En-tête */}
                <div className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.pageTitle}>Coopératives</h1>
                        <p className={styles.pageSubtitle}>
                            {COOPERATIVES.length} coopératives partenaires · {COOPERATIVES.filter(c => c.certifiee).length} certifiées
                        </p>
                    </div>
                    <div className={styles.headerActions}>
                        <Button variant="outline" icon={Download} size="md">Exporter</Button>
                        <Button variant="primary" icon={Plus} size="md">Nouvelle coopérative</Button>
                    </div>
                </div>

                {/* KPIs */}
                <div className={styles.statsRow}>
                    {[
                        { icon: Building2,  label: 'Coopératives', value: COOPERATIVES.length, sub: `${COOPERATIVES.filter(c=>c.status==='active').length} actives`, color: 'var(--color-brand)' },
                        { icon: Users,      label: 'Membres total', value: totalMembres,        sub: 'Tous réseaux',                                               color: '#6366f1' },
                        { icon: Wallet,     label: 'Revenus / mois', value: formatAmount(totalRevenu), sub: '+12% ce mois',                                       color: '#10b981' },
                        { icon: TrendingUp, label: 'Rdt. moyen',    value: `${avgRendement}%`,  sub: `${totalVolume} T ce mois`,                                  color: '#f59e0b' },
                    ].map(({ icon: Icon, label, value, sub, color }) => (
                        <div key={label} className={styles.statCard}>
                            <div className={styles.statIcon} style={{ background: `${color}18`, color }}>
                                <Icon size={18} />
                            </div>
                            <div>
                                <span className={styles.statValue}>{value}</span>
                                <span className={styles.statLabel}>{label}</span>
                                <span className={styles.statSub}>{sub}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <div className={styles.searchWrap}>
                        <Search size={15} className={styles.searchIcon} />
                        <input
                            className={styles.searchInput}
                            placeholder="Rechercher par nom, ville, culture..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className={styles.toolbarRight}>
                        <div className={styles.filterGroup}>
                            <Filter size={13} />
                            <select
                                className={styles.filterSelect}
                                value={regionFilter}
                                onChange={e => setRegionFilter(e.target.value)}
                            >
                                <option value="all">Toutes les régions</option>
                                {regions.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>

                        <div className={styles.statusTabs}>
                            {[
                                { key: 'all',      label: 'Toutes' },
                                { key: 'active',   label: 'Actives' },
                                { key: 'warning',  label: 'À suivre' },
                                { key: 'inactive', label: 'Inactives' },
                            ].map(f => (
                                <button
                                    key={f.key}
                                    className={`${styles.statusTab} ${statusFilter === f.key ? styles.statusTabActive : ''}`}
                                    onClick={() => setStatusFilter(f.key)}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Résultats */}
                {filtered.length > 0 ? (
                    <>
                        <p className={styles.resultsCount}>
                            {filtered.length} coopérative{filtered.length > 1 ? 's' : ''} affichée{filtered.length > 1 ? 's' : ''}
                        </p>
                        <div className={styles.grid}>
                            {filtered.map(coop => (
                                <CoopCard key={coop.id} coop={coop} onClick={setSelectedCoop} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyState}>
                        <Sprout size={40} />
                        <span>Aucune coopérative trouvée</span>
                        <small>Essayez d'autres termes de recherche</small>
                    </div>
                )}

                {/* Alerte coops à surveiller */}
                {COOPERATIVES.some(c => c.status === 'warning' || c.status === 'inactive') && (
                    <div className={styles.alertBanner}>
                        <AlertTriangle size={15} />
                        <span>
                            <strong>{COOPERATIVES.filter(c => c.status !== 'active').length} coopératives</strong> nécessitent un suivi — rendements faibles ou inactivité prolongée.
                        </span>
                    </div>
                )}
            </div>

            {/* Drawer de détail */}
            {selectedCoop && (
                <CoopDrawer
                    coop={selectedCoop}
                    onClose={() => setSelectedCoop(null)}
                />
            )}
        </AppLayout>
    );
};

export default Cooperatives;
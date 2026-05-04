import React, { useState } from 'react';
import { Phone, Mail, Lock, User, ArrowLeft, Landmark as LandmarkIcon } from 'lucide-react';
import InputField from '../../../components/UI/InputField/InputField';
import SelectField from '../../../components/UI/SelectField/SelectField';
import CheckboxField from '../../../components/UI/CheckboxField/CheckboxField';
import SocialButton from '../../../components/UI/SocialButton/SocialButton';
import Button from '../../../components/UI/Button/Button';
import styles from './register.module.css';
import { useNavigate } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Indicatifs pays                                                     */
/* ------------------------------------------------------------------ */
const COUNTRY_CODES = [
    { code: '+228', flag: '🇹🇬', label: 'TG' },
    { code: '+229', flag: '🇧🇯', label: 'BJ' },
    { code: '+226', flag: '🇧🇫', label: 'BF' },
    { code: '+225', flag: '🇨🇮', label: 'CI' },
    { code: '+223', flag: '🇲🇱', label: 'ML' },
    { code: '+221', flag: '🇸🇳', label: 'SN' },
    { code: '+224', flag: '🇬🇳', label: 'GN' },
    { code: '+233', flag: '🇬🇭', label: 'GH' },
    { code: '+234', flag: '🇳🇬', label: 'NG' },
    { code: '+237', flag: '🇨🇲', label: 'CM' },
    { code: '+212', flag: '🇲🇦', label: 'MA' },
    { code: '+213', flag: '🇩🇿', label: 'DZ' },
    { code: '+216', flag: '🇹🇳', label: 'TN' },
    { code: '+20',  flag: '🇪🇬', label: 'EG' },
    { code: '+33',  flag: '🇫🇷', label: 'FR' },
    { code: '+1',   flag: '🇺🇸', label: 'US' },
];

/* ------------------------------------------------------------------ */
/*  Composant PhoneInput                                                */
/* ------------------------------------------------------------------ */
const PhoneInput = ({ dialCode, onDialCodeChange, value, onChange }) => (
    <div className={styles.phoneInputWrapper}>
        <label className={styles.fieldLabel}>Numéro de téléphone *</label>
        <div className={styles.phoneRow}>
            <div className={styles.dialWrapper}>
                <select
                    className={styles.dialSelect}
                    value={dialCode}
                    onChange={e => onDialCodeChange(e.target.value)}
                    aria-label="Indicatif pays"
                >
                    {COUNTRY_CODES.map(c => (
                        <option key={c.code + c.label} value={c.code}>
                            {c.flag} {c.code}
                        </option>
                    ))}
                </select>
                <span className={styles.dialArrow}>▾</span>
            </div>
            <input
                className={styles.phoneInput}
                type="tel"
                placeholder="90 00 00 00"
                value={value}
                onChange={e => onChange(e.target.value)}
                required
                autoComplete="tel"
                inputMode="numeric"
            />
        </div>
        <p className={styles.phoneHint}>
            <Phone size={11} /> Un code de vérification vous sera envoyé par SMS.
        </p>
    </div>
);

/* ------------------------------------------------------------------ */
/*  Google Icon                                                         */
/* ------------------------------------------------------------------ */
const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18">
        <path d="M17.64 9.2c0-.64-.06-1.25-.18-1.8H9v3.41h4.84c-.21 1.15-.86 2.12-1.78 2.78v2.16h2.86c1.68-1.55 2.65-3.83 2.65-6.55z" fill="#4285F4" />
        <path d="M9 18c2.43 0 4.47-.8 5.96-2.16l-2.86-2.16c-.8.54-1.82.86-3.1.86-2.37 0-4.38-1.6-5.09-3.76H.9v2.24C2.45 16.2 5.5 18 9 18z" fill="#34A853" />
        <path d="M3.91 10.74c-.2-.54-.31-1.12-.31-1.74s.11-1.2.31-1.74V5.02H.9C.28 6.24 0 7.58 0 9s.28 2.76.9 3.98l3.01-2.24z" fill="#FBBC05" />
        <path d="M9 3.58c1.32 0 2.5.46 3.44 1.36l2.58-2.58C13.47.8 11.43 0 9 0 5.5 0 2.45 1.8.9 4.38l3.01 2.24C4.62 4.46 6.62 3.58 9 3.58z" fill="#EA4335" />
    </svg>
);

/* ================================================================== */
/*  Composant Register                                                  */
/* ================================================================== */
const Register = () => {
    const navigate = useNavigate();

    const [dialCode, setDialCode]   = useState('+228');
    const [phone, setPhone]         = useState('');
    const [showEmail, setShowEmail] = useState(false);

    const handleDashboardRedirect = () => navigate('/dashboard');

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* ── Colonne gauche Branding ── */}
                <aside className={styles.brandSide}>
                    <div className={styles.brandContent}>
                        <div className={styles.brandText}>
                            <h1 style={{ color: 'var(--white)' }}>
                                Transformons la chaîne de valeur agricole
                            </h1>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-md)', lineHeight: 'var(--lh-relaxed)' }}>
                                Rejoignez le premier registre décentralisé pour une traçabilité transparente, éthique et certifiée de vos produits.
                            </p>
                        </div>
                        <footer className={styles.brandFooter}>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>150+</span>
                                <span className={styles.statLabel}>Coopératives</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>10k+</span>
                                <span className={styles.statLabel}>Utilisateurs</span>
                            </div>
                        </footer>
                    </div>
                </aside>

                {/* ── Colonne droite Formulaire ── */}
                <main className={styles.formSide}>
                    <div className={styles.backLink}>
                        <a href="/" className={styles.backButton}>
                            <ArrowLeft size={14} /> Retour à l'accueil
                        </a>
                    </div>

                    <div className={styles.formWrapper}>
                        <header className={styles.formHeader}>
                            <h2 className={styles.title}>Créer un compte</h2>
                            <p className={styles.subtitle}>
                                Vous avez déjà un compte ?{' '}
                                <a href="/login" className={styles.loginLink}>Connectez-vous</a>
                            </p>
                        </header>

                        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>

                            <SocialButton icon={GoogleIcon}>
                                S'inscrire avec Google
                            </SocialButton>

                            <div className={styles.divider}><span>OU</span></div>

                            {/* Rôle */}
                            <SelectField
                                label="Rôle"
                                id="role"
                                name="role"
                                icon={User}
                                options={[
                                    { value: 'producer',    label: 'Producteur' },
                                    { value: 'cooperative', label: 'Coopérative' },
                                    { value: 'institution', label: 'Institution / Autre' },
                                ]}
                            />

                            {/* Nom */}
                            <InputField
                                label="Nom de la coopérative ou institution"
                                type="text"
                                id="name"
                                name="name"
                                icon={LandmarkIcon}
                                placeholder="Ex: Coop-Agri Togo"
                                required
                            />

                            {/* ── Téléphone (champ principal) ── */}
                            <PhoneInput
                                dialCode={dialCode}
                                onDialCodeChange={setDialCode}
                                value={phone}
                                onChange={setPhone}
                            />

                            {/* ── Toggle e-mail optionnel ── */}
                            <button
                                type="button"
                                className={styles.emailToggle}
                                onClick={() => setShowEmail(p => !p)}
                                aria-expanded={showEmail}
                            >
                                <Mail size={13} />
                                {showEmail
                                    ? "Masquer l'adresse e-mail"
                                    : "Ajouter une adresse e-mail (optionnel)"}
                                <span className={`${styles.chevron} ${showEmail ? styles.chevronUp : ''}`}>›</span>
                            </button>

                            {/* ── Email (optionnel, affiché sur demande) ── */}
                            <div className={`${styles.emailSlot} ${showEmail ? styles.emailSlotOpen : ''}`}>
                                <InputField
                                    label="Adresse e-mail (optionnelle)"
                                    type="email"
                                    id="email"
                                    name="email"
                                    icon={Mail}
                                    placeholder="contact@coop.com"
                                />
                            </div>

                            {/* Mots de passe */}
                            <div className={styles.formRow}>
                                <InputField
                                    label="Mot de passe"
                                    type="password"
                                    id="password"
                                    name="password"
                                    icon={Lock}
                                    placeholder="••••••••"
                                    required
                                />
                                <InputField
                                    label="Confirmation"
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    icon={Lock}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <CheckboxField
                                id="terms"
                                size="md"
                                label="J'accepte les conditions d'utilisation et la politique de confidentialité."
                                required
                            />

                            <Button variant="primary" size="lg" onClick={handleDashboardRedirect}>
                                S'inscrire
                            </Button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Register;
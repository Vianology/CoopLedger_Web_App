import React, { useState } from 'react';
import { Phone, Mail, Lock, ArrowLeft } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import InputField from '../../../components/UI/InputField/InputField';
import CheckboxField from '../../../components/UI/CheckboxField/CheckboxField';
import SocialButton from '../../../components/UI/SocialButton/SocialButton';
import Button from '../../../components/UI/Button/Button';
import styles from './Login.module.css';

/* ------------------------------------------------------------------ */
/*  Données indicatifs                                                  */
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
            <Phone size={11} /> Un SMS de vérification vous sera envoyé
        </p>
    </div>
);

/* ------------------------------------------------------------------ */
/*  Google Icon SVG                                                     */
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
/*  Composant Login                                                     */
/* ================================================================== */
const Login = () => {
    const navigate = useNavigate();

    /* Onglet actif : 'phone' | 'email' */
    const [tab, setTab] = useState('phone');

    /* État téléphone */
    const [dialCode, setDialCode] = useState('+228');
    const [phone, setPhone] = useState('');

    const handleDashboardRedirect = () => navigate('/dashboard');

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* ── Colonne gauche Branding ── */}
                <aside className={styles.brandSide}>
                    <div className={styles.brandContent}>
                        <div className={styles.brandText}>
                            <h1 style={{ color: 'var(--white)' }}>Connectez-vous à votre espace</h1>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-md)', lineHeight: 'var(--lh-relaxed)' }}>
                                Retrouvez vos données certifiées sur la blockchain et le registre de suivi.
                            </p>
                        </div>
                        <NavLink to="/" className={styles.backLink} style={{ color: 'var(--white)' }}>
                            <ArrowLeft size={16} />
                            <span>Retour à l'accueil</span>
                        </NavLink>
                    </div>
                </aside>

                {/* ── Colonne droite Formulaire ── */}
                <main className={styles.formSide}>
                    <div className={styles.formWrapper}>

                        <header className={styles.header}>
                            <h2 className={styles.title}>Bon retour parmi nous</h2>
                            <p className={styles.subtitle}>
                                Vous n'avez pas de compte ?{' '}
                                <NavLink to="/register" className={styles.authLink}>Inscrivez-vous</NavLink>
                            </p>
                        </header>

                        {/* Google */}
                        <SocialButton icon={GoogleIcon} onClick={() => {}}>
                            Continuer avec Google
                        </SocialButton>

                        <div className={styles.divider}><span>OU</span></div>

                        {/* ── Onglets Téléphone / Email ── */}
                        <div className={styles.tabs}>
                            <button
                                type="button"
                                className={`${styles.tab} ${tab === 'phone' ? styles.tabActive : ''}`}
                                onClick={() => setTab('phone')}
                            >
                                <Phone size={14} /> Téléphone
                            </button>
                            <button
                                type="button"
                                className={`${styles.tab} ${tab === 'email' ? styles.tabActive : ''}`}
                                onClick={() => setTab('email')}
                            >
                                <Mail size={14} /> Adresse e-mail
                            </button>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>

                            {tab === 'phone' ? (
                                <>
                                    <PhoneInput
                                        dialCode={dialCode}
                                        onDialCodeChange={setDialCode}
                                        value={phone}
                                        onChange={setPhone}
                                    />
                                    <InputField
                                        label="Mot de passe"
                                        type="password"
                                        id="password"
                                        name="password"
                                        icon={Lock}
                                        placeholder="••••••••"
                                        required
                                    />
                                </>
                            ) : (
                                <>
                                    <InputField
                                        label="Adresse e-mail"
                                        type="email"
                                        id="email"
                                        name="email"
                                        icon={Mail}
                                        placeholder="exemple@coop.com"
                                        required
                                    />
                                    <InputField
                                        label="Mot de passe"
                                        type="password"
                                        id="password"
                                        name="password"
                                        icon={Lock}
                                        placeholder="••••••••"
                                        required
                                    />
                                </>
                            )}

                            <div className={styles.formOptions}>
                                <CheckboxField id="remember" size="md" label="Se souvenir de moi" />
                                <NavLink to="/forgot-password" className={styles.forgotLink}>
                                    Mot de passe oublié ?
                                </NavLink>
                            </div>

                            <Button variant="primary" size="lg" type="submit" onClick={handleDashboardRedirect}>
                                Se connecter
                            </Button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Login;
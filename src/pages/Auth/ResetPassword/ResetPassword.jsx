import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import styles from './ResetPassword.module.css';

/* ── Champ mot de passe avec toggle visibilité ── */
const PasswordField = ({ id, label, value, onChange, placeholder }) => {
    const [visible, setVisible] = useState(false);
    return (
        <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor={id}>{label}</label>
            <div className={styles.fieldRow}>
                <Lock size={16} className={styles.fieldIcon} aria-hidden />
                <input
                    id={id}
                    name={id}
                    type={visible ? 'text' : 'password'}
                    className={styles.fieldInput}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    required
                    autoComplete={id === 'password' ? 'new-password' : 'new-password'}
                />
                <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setVisible(v => !v)}
                    aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                    {visible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
        </div>
    );
};

/* ── Indicateur de force ── */
const StrengthBar = ({ password }) => {
    const score = (() => {
        let s = 0;
        if (password.length >= 8)              s++;
        if (/[A-Z]/.test(password))            s++;
        if (/[0-9]/.test(password))            s++;
        if (/[^A-Za-z0-9]/.test(password))     s++;
        return s;
    })();

    const labels = ['', 'Faible', 'Moyen', 'Bon', 'Fort'];
    const colors = ['', styles.weak, styles.fair, styles.good, styles.strong];

    if (!password) return null;

    return (
        <div className={styles.strengthWrapper}>
            <div className={styles.strengthBars}>
                {[1,2,3,4].map(i => (
                    <span
                        key={i}
                        className={`${styles.bar} ${i <= score ? colors[score] : ''}`}
                    />
                ))}
            </div>
            <span className={`${styles.strengthLabel} ${colors[score]}`}>
                {labels[score]}
            </span>
        </div>
    );
};

/* ================================================================== */
const ResetPassword = () => {
    const navigate  = useNavigate();
    const location  = useLocation();

    /* Contact transmis depuis OtpVerify */
    const contact = location.state?.contact || '';

    const [password, setPassword]   = useState('');
    const [confirm, setConfirm]     = useState('');
    const [error, setError]         = useState('');
    const [loading, setLoading]     = useState(false);
    const [done, setDone]           = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }
        if (password !== confirm) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }
        setError('');
        setLoading(true);
        /* TODO: appel API reset password */
        setTimeout(() => {
            setLoading(false);
            setDone(true);
            setTimeout(() => navigate('/login'), 2500);
        }, 1000);
    };

    /* ── Succès ── */
    if (done) return (
        <div className={styles.wrapper}>
            <div className={styles.successBox}>
                <span className={styles.successIcon}><CheckCircle2 size={52} /></span>
                <h2 className={styles.successTitle}>Mot de passe réinitialisé !</h2>
                <p className={styles.successSub}>Redirection vers la connexion…</p>
            </div>
        </div>
    );

    /* ── Formulaire ── */
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>

                <button className={styles.back} onClick={() => navigate('/login')}>
                    <ArrowLeft size={14} /> Retour à la connexion
                </button>

                <div className={styles.iconBadge}><Lock size={22} /></div>

                <h2 className={styles.title}>Nouveau mot de passe</h2>
                <p className={styles.subtitle}>
                    Choisissez un mot de passe sécurisé pour votre compte
                    {contact && <> associé à <strong>{contact}</strong></>}.
                </p>

                <form className={styles.form} onSubmit={handleSubmit}>

                    <PasswordField
                        id="password"
                        label="Nouveau mot de passe"
                        value={password}
                        onChange={setPassword}
                        placeholder="••••••••"
                    />

                    <StrengthBar password={password} />

                    <PasswordField
                        id="confirm"
                        label="Confirmer le mot de passe"
                        value={confirm}
                        onChange={setConfirm}
                        placeholder="••••••••"
                    />

                    {error && <p className={styles.errorMsg}>{error}</p>}

                    <ul className={styles.rules}>
                        <li className={password.length >= 8 ? styles.ruleOk : ''}>
                            Au moins 8 caractères
                        </li>
                        <li className={/[A-Z]/.test(password) ? styles.ruleOk : ''}>
                            Une majuscule
                        </li>
                        <li className={/[0-9]/.test(password) ? styles.ruleOk : ''}>
                            Un chiffre
                        </li>
                    </ul>

                    <Button variant="primary" size="lg" type="submit" isLoading={loading}>
                        Enregistrer le mot de passe
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
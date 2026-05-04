import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Mail, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import styles from './OtpVerify.module.css';

const OTP_LENGTH  = 6;
const RESEND_SECS = 60;

/* ── Destination selon le contexte ── */
const REDIRECT = {
    register : '/dashboard',
    login    : '/dashboard',
    reset    : '/reset-password',
};

/* ================================================================== */
const OtpVerify = () => {
    const navigate  = useNavigate();
    const location  = useLocation();

    /* Données transmises depuis la page précédente */
    const context = location.state?.context || 'login';    // 'register' | 'login' | 'reset'
    const via     = location.state?.via     || 'phone';    // 'phone' | 'email'
    const contact = location.state?.contact || '+228 •• ••';

    /* ── OTP ── */
    const [digits, setDigits]     = useState(Array(OTP_LENGTH).fill(''));
    const [error, setError]       = useState('');
    const [verified, setVerified] = useState(false);
    const inputRefs = useRef([]);

    /* ── Countdown ── */
    const [countdown, setCountdown] = useState(RESEND_SECS);
    const [canResend, setCanResend] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => { startCountdown(); return () => clearInterval(timerRef.current); }, []);

    const startCountdown = () => {
        setCountdown(RESEND_SECS);
        setCanResend(false);
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) { clearInterval(timerRef.current); setCanResend(true); return 0; }
                return prev - 1;
            });
        }, 1000);
    };

    /* ── Handlers ── */
    const handleChange = (i, value) => {
        const char = value.replace(/\D/g, '').slice(-1);
        const next = [...digits]; next[i] = char; setDigits(next); setError('');
        if (char && i < OTP_LENGTH - 1) inputRefs.current[i + 1]?.focus();
    };

    const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace') {
            if (digits[i]) { const n=[...digits]; n[i]=''; setDigits(n); }
            else if (i > 0) inputRefs.current[i - 1]?.focus();
        }
        if (e.key === 'ArrowLeft'  && i > 0)           inputRefs.current[i - 1]?.focus();
        if (e.key === 'ArrowRight' && i < OTP_LENGTH-1) inputRefs.current[i + 1]?.focus();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g,'').slice(0, OTP_LENGTH);
        const next = Array(OTP_LENGTH).fill('');
        [...pasted].forEach((c,i) => { next[i]=c; });
        setDigits(next);
        inputRefs.current[Math.min(pasted.length, OTP_LENGTH-1)]?.focus();
    };

    const handleVerify = () => {
        if (digits.join('').length < OTP_LENGTH) {
            setError('Veuillez entrer les 6 chiffres du code.');
            return;
        }
        /* TODO: appel API vérification OTP */
        setVerified(true);
        setTimeout(() => {
            navigate(REDIRECT[context] ?? '/dashboard', {
                /* Transmettre le contexte à reset-password si besoin */
                state: { via, contact }
            });
        }, 2000);
    };

    const handleResend = () => {
        if (!canResend) return;
        setDigits(Array(OTP_LENGTH).fill(''));
        setError('');
        inputRefs.current[0]?.focus();
        startCountdown();
        /* TODO: appel API renvoi OTP */
    };

    /* ── Texte du canal ── */
    const ChannelIcon = via === 'phone' ? Phone : Mail;
    const channelWord = via === 'phone' ? 'téléphone' : 'e-mail';
    const channelPrep = via === 'phone' ? `au numéro ${contact}` : `à l'adresse ${contact}`;

    /* ── Titre selon le contexte ── */
    const titles = {
        register : 'Confirmez votre numéro',
        login    : `Vérifiez votre ${channelWord}`,
        reset    : 'Vérifiez votre identité',
    };

    /* ── Succès ── */
    if (verified) return (
        <div className={styles.wrapper}>
            <div className={styles.successBox}>
                <span className={styles.successIcon}><CheckCircle2 size={52} /></span>
                <h2 className={styles.successTitle}>Identité vérifiée !</h2>
                <p className={styles.successSub}>
                    {context === 'reset'
                        ? 'Redirection vers la réinitialisation du mot de passe…'
                        : 'Redirection vers votre tableau de bord…'}
                </p>
            </div>
        </div>
    );

    /* ── Formulaire ── */
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>

                <button className={styles.back} onClick={() => navigate(-1)}>
                    <ArrowLeft size={14} /> Retour
                </button>

                <div className={styles.iconBadge}><ChannelIcon size={22} /></div>

                <h2 className={styles.title}>{titles[context]}</h2>
                <p className={styles.subtitle}>
                    Nous avons envoyé un code à 6 chiffres <strong>{channelPrep}</strong>.
                    Saisissez-le ci-dessous.
                </p>

                {/* ── Boxes OTP ── */}
                <div className={styles.otpRow} onPaste={handlePaste}>
                    {digits.map((d, i) => (
                        <React.Fragment key={i}>
                            {/* Séparateur entre position 2 et 3 (index 2→3) */}
                            {i === 3 && <span className={styles.otpSep} aria-hidden>—</span>}
                            <input
                                ref={el => inputRefs.current[i] = el}
                                className={`${styles.otpBox} ${error ? styles.otpBoxError : ''} ${d ? styles.otpBoxFilled : ''}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={d}
                                onChange={e => handleChange(i, e.target.value)}
                                onKeyDown={e => handleKeyDown(i, e)}
                                autoFocus={i === 0}
                                aria-label={`Chiffre ${i + 1}`}
                            />
                        </React.Fragment>
                    ))}
                </div>

                {error && <p className={styles.errorMsg}>{error}</p>}

                <Button variant="primary" size="lg" onClick={handleVerify}>
                    Confirmer le code
                </Button>

                <div className={styles.resendRow}>
                    {canResend ? (
                        <button className={styles.resendBtn} onClick={handleResend}>
                            <RefreshCw size={13} /> Renvoyer le code
                        </button>
                    ) : (
                        <span className={styles.resendCountdown}>
                            Renvoyer dans <strong>{countdown}s</strong>
                        </span>
                    )}
                </div>

                {/* Lien de secours */}
                {context === 'reset' && (
                    <p className={styles.altLink}>
                        Code non reçu ?{' '}
                        <button className={styles.altLinkBtn} onClick={() => navigate('/forgot-password')}>
                            Changer de moyen de contact
                        </button>
                    </p>
                )}

            </div>
        </div>
    );
};

export default OtpVerify;
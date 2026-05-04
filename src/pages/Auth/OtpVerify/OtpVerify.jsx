import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Mail, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import styles from './OtpVerify.module.css';

const OTP_LENGTH = 6;
const RESEND_DELAY = 60; // secondes

/* ================================================================== */
/*  Composant OtpVerify                                                 */
/* ================================================================== */
const OtpVerify = () => {
    const navigate = useNavigate();
    const location = useLocation();

    /*  On récupère le canal et le contact depuis le state de navigation
        Ex: navigate('/otp', { state: { via: 'phone', contact: '+228 90 00 00 00' } })
        Valeurs par défaut si accès direct                               */
    const via     = location.state?.via     || 'phone';   // 'phone' | 'email'
    const contact = location.state?.contact || '+228 90 00 ••';

    /* ── État OTP ── */
    const [digits, setDigits]     = useState(Array(OTP_LENGTH).fill(''));
    const [error, setError]       = useState('');
    const [verified, setVerified] = useState(false);

    /* ── Resend countdown ── */
    const [countdown, setCountdown] = useState(RESEND_DELAY);
    const [canResend, setCanResend] = useState(false);
    const timerRef = useRef(null);

    /* Refs des inputs pour auto-focus */
    const inputRefs = useRef([]);

    /* Démarrage du countdown au montage */
    useEffect(() => {
        startCountdown();
        return () => clearInterval(timerRef.current);
    }, []);

    const startCountdown = () => {
        setCountdown(RESEND_DELAY);
        setCanResend(false);
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    /* ── Saisie d'un chiffre ── */
    const handleChange = (index, value) => {
        const char = value.replace(/\D/g, '').slice(-1); // un seul chiffre
        const next = [...digits];
        next[index] = char;
        setDigits(next);
        setError('');

        if (char && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    /* ── Backspace ── */
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (digits[index]) {
                const next = [...digits];
                next[index] = '';
                setDigits(next);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
        if (e.key === 'ArrowLeft' && index > 0)          inputRefs.current[index - 1]?.focus();
        if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
    };

    /* ── Coller un code ── */
    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
        const next = Array(OTP_LENGTH).fill('');
        [...pasted].forEach((c, i) => { next[i] = c; });
        setDigits(next);
        const lastFilled = Math.min(pasted.length, OTP_LENGTH - 1);
        inputRefs.current[lastFilled]?.focus();
    };

    /* ── Vérification ── */
    const handleVerify = () => {
        const code = digits.join('');
        if (code.length < OTP_LENGTH) {
            setError('Veuillez entrer les 6 chiffres du code.');
            return;
        }
        /* TODO: appel API réel ici */
        setVerified(true);
        setTimeout(() => navigate('/dashboard'), 2000);
    };

    const handleResend = () => {
        if (!canResend) return;
        setDigits(Array(OTP_LENGTH).fill(''));
        setError('');
        inputRefs.current[0]?.focus();
        startCountdown();
        /* TODO: appel API renvoi SMS/email */
    };

    /* ── Label du canal ── */
    const channelLabel = via === 'phone'
        ? `au numéro ${contact}`
        : `à l'adresse ${contact}`;

    const ChannelIcon = via === 'phone' ? Phone : Mail;

    /* ── Écran succès ── */
    if (verified) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.successBox}>
                    <span className={styles.successIcon}><CheckCircle2 size={48} /></span>
                    <h2 className={styles.successTitle}>Identité vérifiée !</h2>
                    <p className={styles.successSub}>Redirection vers votre tableau de bord…</p>
                </div>
            </div>
        );
    }

    /* ── Formulaire principal ── */
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>

                {/* Retour */}
                <button className={styles.back} onClick={() => navigate(-1)}>
                    <ArrowLeft size={14} /> Retour
                </button>

                {/* Icône canal */}
                <div className={styles.iconBadge}>
                    <ChannelIcon size={22} />
                </div>

                {/* Header */}
                <h2 className={styles.title}>Vérifiez votre {via === 'phone' ? 'téléphone' : 'e-mail'}</h2>
                <p className={styles.subtitle}>
                    Nous avons envoyé un code à 6 chiffres <strong>{channelLabel}</strong>.
                    Saisissez-le ci-dessous pour confirmer votre identité.
                </p>

                {/* Boxes OTP */}
                <div className={styles.otpRow} onPaste={handlePaste}>
                    {digits.map((d, i) => (
                        <input
                            key={i}
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
                    ))}
                </div>

                {/* Séparateur visuel entre les groupes de 3 */}
                {/* (géré via nth-child dans le CSS) */}

                {/* Message d'erreur */}
                {error && <p className={styles.errorMsg}>{error}</p>}

                {/* Bouton principal */}
                <Button variant="primary" size="lg" onClick={handleVerify}>
                    Confirmer le code
                </Button>

                {/* Renvoyer */}
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

            </div>
        </div>
    );
};

export default OtpVerify;
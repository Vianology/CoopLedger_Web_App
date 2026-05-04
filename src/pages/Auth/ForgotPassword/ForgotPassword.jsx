import React, { useState } from 'react';
import { Phone, Mail, ArrowLeft, SendHorizonal, CheckCircle2 } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/UI/InputField/InputField';
import Button from '../../../components/UI/Button/Button';
import styles from './ForgotPassword.module.css';

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

/* ================================================================== */
/*  Composant ForgotPassword                                            */
/* ================================================================== */
const ForgotPassword = () => {
    const navigate = useNavigate();

    /* Canal sélectionné */
    const [via, setVia]         = useState('phone'); // 'phone' | 'email'

    /* Champs */
    const [dialCode, setDialCode] = useState('+228');
    const [phone, setPhone]       = useState('');
    const [email, setEmail]       = useState('');

    /* États */
    const [loading, setLoading]   = useState(false);
    const [sent, setSent]         = useState(false);

    const contact = via === 'phone'
        ? `${dialCode} ${phone || '••••••••'}`
        : (email || '••••@••••.com');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        /* TODO: appel API réel */
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 1200);
    };

    /* ── Écran confirmation envoi ── */
    if (sent) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <div className={styles.sentIcon}>
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className={styles.title}>
                        {via === 'phone' ? 'Message WhatsApp envoyé !' : 'E-mail envoyé !'}
                    </h2>
                    <p className={styles.subtitle}>
                        {via === 'phone'
                            ? <>Un message WhatsApp avec un lien de réinitialisation a été envoyé au <strong>{contact}</strong>. Vérifiez vos messages WhatsApp.</>
                            : <>Un lien de réinitialisation a été envoyé à <strong>{contact}</strong>. Vérifiez votre boîte de réception e-mail principale(et les spams).</>
                        }
                    </p>

                    <div className={styles.sentActions}>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate('/otp', {
                                state: { via, contact }
                            })}
                        >
                            Saisir le code reçu
                        </Button>
                        <button
                            className={styles.retryBtn}
                            onClick={() => setSent(false)}
                        >
                            Modifier le contact
                        </button>
                    </div>

                    <button className={styles.back} onClick={() => navigate('/login')}>
                        <ArrowLeft size={13} /> Retour à la connexion
                    </button>
                </div>
            </div>
        );
    }

    /* ── Formulaire principal ── */
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>

                {/* Retour */}
                <button className={styles.back} onClick={() => navigate('/login')}>
                    <ArrowLeft size={14} /> Retour à la connexion
                </button>

                {/* Icône */}
                <div className={styles.iconBadge}>
                    <SendHorizonal size={22} />
                </div>

                {/* Header */}
                <h2 className={styles.title}>Mot de passe oublié ?</h2>
                <p className={styles.subtitle}>
                    Choisissez comment recevoir un lien de réinitialisation.
                    Pas de panique, ça arrive à tout le monde.
                </p>

                {/* ── Onglets SMS / Email ── */}
                <div className={styles.tabs}>
                    <button
                        type="button"
                        className={`${styles.tab} ${via === 'phone' ? styles.tabActive : ''}`}
                        onClick={() => setVia('phone')}
                    >
                       <IconBrandWhatsapp size={24} /> Par WhatApp
                        
                        
                    </button>
                    <button
                        type="button"
                        className={`${styles.tab} ${via === 'email' ? styles.tabActive : ''}`}
                        onClick={() => setVia('email')}
                    >
                        <Mail size={24} /> Par e-mail
                    </button>
                </div>

                {/* ── Formulaire ── */}
                <form className={styles.form} onSubmit={handleSubmit}>

                    {via === 'phone' ? (
                        <div className={styles.phoneInputWrapper}>
                            <label className={styles.fieldLabel}>Votre numéro de téléphone</label>
                            <div className={styles.phoneRow}>
                                <div className={styles.dialWrapper}>
                                    <select
                                        className={styles.dialSelect}
                                        value={dialCode}
                                        onChange={e => setDialCode(e.target.value)}
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
                                    value={phone}
                                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                                    required
                                    inputMode="numeric"
                                />
                            </div>
                            <p className={styles.fieldHint}>
                                <Phone size={11} /> Vous recevrez un message WhatsApp avec un lien sécurisé.
                            </p>
                        </div>
                    ) : (
                        <div>
                            <InputField
                                label="Votre adresse e-mail"
                                type="email"
                                id="email"
                                name="email"
                                icon={Mail}
                                placeholder="contact@coop.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <p className={styles.fieldHint} style={{ marginTop: 'var(--space-2)' }}>
                                <Mail size={11} /> Un lien de réinitialisation sera envoyé à cette adresse.
                            </p>
                        </div>
                    )}

                    <Button
                        variant="primary"
                        size="lg"
                        isLoading={loading}
                        type="submit"
                    >
                        {loading ? 'Envoi en cours…' : 'Envoyer le lien'}
                    </Button>
                </form>

            </div>
        </div>
    );
};

export default ForgotPassword;
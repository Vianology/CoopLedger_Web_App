import React, { useState } from 'react';
import { Mail, ArrowLeft, SendHorizonal, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/UI/InputField/InputField';
import Button     from '../../../components/UI/Button/Button';
import PhoneInput from '../../../components/UI/PhoneInput/PhoneInput';
import styles     from './ForgotPassword.module.css';

/* ── WhatsApp Icon ── */
const WhatsAppIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);

/* ================================================================== */
const ForgotPassword = () => {
    const navigate = useNavigate();

    const [via, setVia]           = useState('phone'); // 'phone' | 'email'
    const [dialCode, setDialCode] = useState('+228');
    const [phone, setPhone]       = useState('');
    const [email, setEmail]       = useState('');
    const [loading, setLoading]   = useState(false);
    const [sent, setSent]         = useState(false);

    const contact = via === 'phone'
        ? `${dialCode} ${phone || '•• •• •• ••'}`
        : (email || '••••@••••.com');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        /* TODO: appel API envoi lien/code */
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 1200);
    };

    const goToOtp = () => navigate('/otp', {
        state: {
            context : 'reset',      // après OTP → /reset-password
            via,
            contact,
        }
    });

    /* ── Écran confirmation envoi ── */
    if (sent) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <div className={styles.sentIcon}><CheckCircle2 size={48} /></div>

                    <h2 className={styles.title}>
                        {via === 'phone' ? 'Message WhatsApp envoyé !' : 'E-mail envoyé !'}
                    </h2>

                    <p className={styles.subtitle}>
                        {via === 'phone'
                            ? <>Un code de réinitialisation a été envoyé sur WhatsApp au <strong>{contact}</strong>. Vérifiez vos messages.</>
                            : <>Un code de réinitialisation a été envoyé à <strong>{contact}</strong>. Vérifiez votre boîte de réception (et les spams).</>
                        }
                    </p>

                    <div className={styles.sentActions}>
                        <Button variant="primary" size="lg" onClick={goToOtp}>
                            Saisir le code reçu
                        </Button>
                        <button className={styles.retryBtn} onClick={() => setSent(false)}>
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

                <button className={styles.back} onClick={() => navigate('/login')}>
                    <ArrowLeft size={14} /> Retour à la connexion
                </button>

                <div className={styles.iconBadge}>
                    <SendHorizonal size={22} />
                </div>

                <h2 className={styles.title}>Mot de passe oublié ?</h2>
                <p className={styles.subtitle}>
                    Pas de panique. Choisissez comment recevoir un code de réinitialisation.
                </p>

                {/* ── Onglets ── */}
                <div className={styles.tabs}>
                    <button
                        type="button"
                        className={`${styles.tab} ${via === 'phone' ? styles.tabActive : ''}`}
                        onClick={() => setVia('phone')}
                    >
                        <WhatsAppIcon size={15} /> Par WhatsApp
                    </button>
                    <button
                        type="button"
                        className={`${styles.tab} ${via === 'email' ? styles.tabActive : ''}`}
                        onClick={() => setVia('email')}
                    >
                        <Mail size={14} /> Par e-mail
                    </button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>

                    {via === 'phone' ? (
                        <PhoneInput
                            dialCode={dialCode}
                            onDialCodeChange={setDialCode}
                            value={phone}
                            onChange={setPhone}
                            label="Votre numéro de téléphone"
                            hint="Vous recevrez un message WhatsApp avec un code de réinitialisation .."
                        />
                    ) : (
                        <div className={styles.emailBlock}>
                            <InputField
                                label="Votre adresse e-mail"
                                type="email" id="email" name="email"
                                icon={Mail}
                                placeholder="contact@coop.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <p className={styles.fieldHint}>
                                <Mail size={11} /> Un code de réinitialisation sera envoyé à cette adresse.
                            </p>
                        </div>
                    )}

                    <Button variant="primary" size="lg" isLoading={loading} type="submit">
                        {loading ? 'Envoi en cours…' : 'Envoyer le code'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
import React from 'react';
import { Phone } from 'lucide-react';
import countries from '../../../data/countries.json';
import styles from './PhoneInput.module.css';

/**
 * PhoneInput — composant partagé entre Register, Login et ForgotPassword.
 *
 * Props:
 *  - dialCode        : string  — indicatif sélectionné (ex: '+228')
 *  - onDialCodeChange: fn      — callback(newDialCode)
 *  - value           : string  — numéro sans indicatif
 *  - onChange        : fn      — callback(newValue)
 *  - label           : string  — label du champ (optionnel)
 *  - hint            : string  — texte sous le champ (optionnel)
 *  - required        : bool
 */
const PhoneInput = ({
    dialCode,
    onDialCodeChange,
    value,
    onChange,
    label = 'Numéro de téléphone',
    hint  = 'Un code de vérification vous sera envoyé par WhatsApp.',
    required = true,
}) => {
    /* Pays triés : priorité d'abord, puis alphabétique */
    const sorted = [...countries].sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        return a.name.localeCompare(b.name, 'fr');
    });

    return (
        <div className={styles.wrapper}>
            {label && (
                <label className={styles.label}>
                    {label}{required && ' *'}
                </label>
            )}

            <div className={styles.inputRow}>
                {/* ── Sélecteur d'indicatif ── */}
                <div className={styles.dialWrapper}>
                    <select
                        className={styles.dialSelect}
                        value={dialCode}
                        onChange={e => onDialCodeChange(e.target.value)}
                        aria-label="Indicatif pays"
                    >
                        {/* Séparation visuelle entre priorités */}
                        {[1, 2, 3].map(priority => (
                            <React.Fragment key={priority}>
                                {priority > 1 && (
                                    <option disabled>──────────</option>
                                )}
                                {sorted
                                    .filter(c => c.priority === priority)
                                    .map(c => (
                                        <option key={c.iso} value={c.dial}>
                                            {c.flag}  {c.dial}  {c.name}
                                        </option>
                                    ))
                                }
                            </React.Fragment>
                        ))}
                    </select>
                    <span className={styles.dialArrow} aria-hidden>▾</span>
                </div>

                {/* ── Numéro ── */}
                <input
                    className={styles.numberInput}
                    type="tel"
                    inputMode="numeric"
                    placeholder="90 00 00 00"
                    value={value}
                    onChange={e => onChange(e.target.value.replace(/\D/g, ''))}
                    required={required}
                    autoComplete="tel-national"
                />
            </div>

            {hint && (
                <p className={styles.hint}>
                    <Phone size={11} aria-hidden /> {hint}
                </p>
            )}
        </div>
    );
};

export default PhoneInput;
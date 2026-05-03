import React from 'react';
import { Mail, Lock, Landmark, ArrowLeft } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import InputField from '../../../components/UI/InputField/InputField';
import CheckboxField from '../../../components/UI/CheckboxField/CheckboxField';
import SocialButton from '../../../components/UI/SocialButton/SocialButton';
import Button from '../../../components/UI/Button/Button';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate()

    const handleDashboardRedirect = () => {
        navigate('/dashboard');
    };

    // SVG Google pour le SocialButton
    const GoogleIcon = () => (
        <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M17.64 9.2c0-.64-.06-1.25-.18-1.8H9v3.41h4.84c-.21 1.15-.86 2.12-1.78 2.78v2.16h2.86c1.68-1.55 2.65-3.83 2.65-6.55z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.47-.8 5.96-2.16l-2.86-2.16c-.8.54-1.82.86-3.1 .86-2.37 0-4.38-1.6-5.09-3.76H.9v2.24C2.45 16.2 5.5 18 9 18z" fill="#34A853" />
            <path d="M3.91 10.74c-.2-.54-.31-1.12-.31-1.74s.11-1.2.31-1.74V5.02H.9C.28 6.24 0 7.58 0 9s.28 2.76.9 3.98l3.01-2.24z" fill="#FBBC05" />
            <path d="M9 3.58c1.32 0 2.5.46 3.44 1.36l2.58-2.58C13.47.8 11.43 0 9 0 5.5 0 2.45 1.8.9 4.38l3.01 2.24C4.62 4.46 6.62 3.58 9 3.58z" fill="#EA4353" />
        </svg>
    );

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {/* Colonne gauche - Branding (Identique à Register) */}
                    <aside className={styles.brandSide}>
                        <div className={styles.brandContent}>
                            
                            <div className={styles.brandText}>
                                <h1 style={{ color: 'var(--white)' }}>Connectez-vous à votre espace</h1>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-md)', lineHeight: 'var(--lh-relaxed)' }}>
                                    Retrouvez vos données certifiées sur la blockchain et le registre de suivi.
                                </p>
                            </div>

                            <div>
                                <NavLink to="/" className={styles.backLink} style={{ color: 'var(--white)' }}>
                                    <ArrowLeft size={16} />
                                    <span>Retour à l'accueil</span>
                                </NavLink>
                            </div>
                        </div>
                    </aside>

                    {/* Colonne droite - Formulaire */}
                    <main className={styles.formSide}>
                        <div>
                            <header className={styles.header}>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h2)', color: 'var(--color-text-primary)' }}>
                                    Bon retour parmi nous
                                </h2>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)' }}>
                                    Vous n'avez pas de compte ?{' '}
                                    <NavLink to="/register" style={{ color: 'var(--color-brand)', fontWeight: 'var(--fw-semibold)', textDecoration: 'none' }}>
                                        Inscrivez-vous
                                    </NavLink>
                                </p>
                            </header>

                            <form onSubmit={(e) => e.preventDefault()} className={styles.form}>


                                <SocialButton 
                                    icon={GoogleIcon}
                                    onClick={() => {}}
                                >
                                    Continuer avec Google
                                </SocialButton>

                                <div className={styles.divider}>OU</div>
                                
                                <div className={styles.formGroup}>
                                    <InputField 
                                        label="Adresse email"
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
                                </div>

                                <div className={styles.formOptions}>
                                    <CheckboxField 
                                        id="remember"
                                        size="md"
                                        label="Se souvenir de moi"
                                    />
                                    <NavLink to="/forgot-password" style={{ color: 'var(--color-brand)', textDecoration: 'none', fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-medium)' }}>
                                        Mot de passe oublié ?
                                    </NavLink>
                                </div>

                                <Button 
                                    variant="primary" 
                                    size="lg" 
                                    type="submit"
                                    onClick={handleDashboardRedirect}
                                >
                                    Se connecter
                                </Button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Login;
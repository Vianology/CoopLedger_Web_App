import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './hero.module.css';
import Button from '../UI/Button/Button';
import heroImage from '../../assets/images/wheat-field.png';
import { BadgeCheck } from 'lucide-react';

function Hero() {
    const navigate = useNavigate();

    // Redirige vers la route /login
    const handleLoginRedirect = () => {
        navigate('/login');
    };

    // Déclenche le téléchargement du fichier PDF
    const handleDownloadPdf = () => {
        // Remplacez '/documents/presentation.pdf' par le chemin de votre fichier dans le dossier public
        const link = document.createElement('a');
        link.href = '../../../public/documents/CoopLedger_TG28_Documentation_Phase1.pdf'; 
        link.download = 'documentation_de_coopledger.pdf'; // Nom du fichier lors du téléchargement
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className={styles.hero_container}>
            {/* GAUCHE : Texte */}
            <div className={styles.content_left}>
                <h1 className={styles.title}>
                    La transparence<br />
                    au service de<br />
                    <em className={styles.highlight}>la terre</em>
                </h1>

                <p className={styles.description}>
                    Le registre agricole de demain, propulsé par la blockchain.
                    Nous sécurisons la gouvernance des coopératives togolaises
                    pour une distribution équitable des ressources.
                </p>

                <div className={styles.cta_group}>
                    <Button 
                        variant="primary" 
                        size="xl" 
                        onClick={handleLoginRedirect}
                    >
                        Commencer
                    </Button>
                    <Button 
                        variant="secondary" 
                        size="lg" 
                        onClick={handleDownloadPdf}
                    >
                        En savoir plus
                    </Button>
                </div>
            </div>

            {/* DROITE : Image + Badge */}
            <div className={styles.content_right}>
                <div className={styles.image_wrapper}>
                    {/* Halo décoratif */}
                    <div className={styles.halo} />

                    <img
                        src={heroImage}
                        alt="Champs de blé doré, agriculture togolaise"
                        className={styles.main_img}
                    />

                    {/* Floating Card */}
                    <div className={styles.floating_card}>
                        <div className={styles.card_header}>
                            <div className={styles.card_icon_wrap}>
                                <BadgeCheck size={20} color="var(--color-brand)" />
                            </div>
                            <h4 className={styles.card_title}>Gouvernance<br />Immuable</h4>
                        </div>
                        <p className={styles.card_body}>
                            Chaque transaction et vote est inscrit dans le registre mondial.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
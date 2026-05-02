import Hero from '../components/Hero/Hero';
import Problem from '../components/Problem/Problem';
import Features from '../components/Features/Features';
import Partners from '../components/Partners/Partners';
import Footer from '../components/Footer/Footer';

function Home() {
    return (
        <>
            <Hero/>
            <Problem/>
            <Features />
            <Partners />
            <Footer />
        </>
    );
}

export default Home
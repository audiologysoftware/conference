import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MobilePopup from '../components/MobilePopup';
const Navbar = lazy(() => import('../components/Navbar'));
const About = lazy(() => import('../components/About'));
const Speaker = lazy(() => import('../components/Speakers'));
const Hero = lazy(() => import('../components/Hero'));
const Organizers = lazy(() => import('../components/Organizers'));
const Sponsors = lazy(() => import('../components/Sponsors'));
const Schedule = lazy(() => import('../components/Schedule'));
const Registration = lazy(() => import('../components/Registration'));
const Upload = lazy(() => import('../components/Upload'));
const Contact = lazy(() => import('../components/Contact'));
const Venue = lazy(() => import('../components/Venue'));
const Accommodations = lazy(() => import('../components/Accommodations'));
const Footer = lazy(() => import('../components/Footer'));
const Layout = lazy(() => import('../components/Layout'));


function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.ctrlKey && event.key === "l") {
                event.preventDefault(); // Prevent default browser behavior
                navigate("/login");
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [navigate]);




    return (
        <Layout navbar={<Navbar />} hero={<Hero />} footer={<Footer />}>
            <Suspense fallback={<div>Loading...</div>}>
                <About />
                <Speaker />
                {/* <Sponsors /> */}
                <Organizers />
                <Schedule />
                <Registration />
                <Upload />
                <Contact />
                <Venue />
                <Accommodations />
            </Suspense>
            <MobilePopup />
        </Layout>
    );
}

export default Home;

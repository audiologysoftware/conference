import React from 'react';
import { Suspense, lazy } from 'react';
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
        </Layout>
    );
}

export default Home;

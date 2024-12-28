import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Speaker from '../components/Speakers';
import Hero from '../components/Hero';
import Organizers from '../components/Organizers';
import Sponsors from '../components/Sponsors';
import Schedule from '../components/Schedule';
import Registration from '../components/Registration';
import Upload from '../components/Upload';
import Contact from '../components/Contact';
import Venue from '../components/Venue';
import Accommodations from '../components/Accommodations';
import Footer from '../components/Footer';
import Layout from '../components/Layout';



function Home() {
    return (
        <Layout navbar={<Navbar />} hero={<Hero />} footer={<Footer />}>
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
        </Layout>
    );
}

export default Home;

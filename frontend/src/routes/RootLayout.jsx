import React from 'react';
import Header from 'partials/Header/Header';
import Footer from 'partials/Footer/Footer';
import { Outlet } from 'react-router-dom';
import 'index.scss';
import BreadcrumbSection from 'components/HeaderComponents/Breadcrumbs';

export default function RootLayout() {
    return (
        <div className='root-layout'>
            <Header />
            <BreadcrumbSection />
                
            <main>
                <div className="content_rootLayout" >
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
}
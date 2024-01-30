"use server"

import styles from './home.module.scss';
import PageLayout from '@/src/layouts/page/page-layout';
import Banner from '@/src/components/banner/banner';
import { LinkButton } from '@/src/components/button/button';
import { Fragment } from 'react';
import Footer from '@/src/components/footer/footer';

const HomePage: React.FC = () => {
    return (
        <div className='flex_column_space_between'>
            <Banner/>

            <PageLayout>
                <LinkButton href="/translations"> Go to translation file selection</LinkButton>
            </PageLayout>

            <Footer/>
        </div>
    )
}

export default HomePage;
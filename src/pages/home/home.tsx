"use server"

import styles from './home.module.scss';
import PageLayout from '@/src/layouts/page/page-layout';
import Banner from '@/src/components/banner/banner';
import { LinkButton } from '@/src/components/button/button';
import { Fragment } from 'react';

const HomePage: React.FC = () => {
    return (
        <Fragment>
            <Banner/>

            <PageLayout>
                <LinkButton href="/translations"> Go to translation file selection</LinkButton>
            </PageLayout>
        </Fragment>
    )
}

export default HomePage;
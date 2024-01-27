"use server"

import styles from './home.module.scss';
import PageLayout from '@/src/layouts/page/page-layout';
import Banner from '@/src/components/banner/banner';
import Button, { LinkButton } from '@/src/components/button/button';
import Link from 'next/link';

const HomePage: React.FC = () => {
    return (
        <PageLayout>
            <Banner/>
            
            <div className={styles.root}>
                <LinkButton href="/vocabulary"> Go to vocabulary file selection</LinkButton>
            </div>
        </PageLayout>
    )
}

export default HomePage;
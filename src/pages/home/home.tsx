"use server"

import styles from './home.module.scss';
import PageLayout from '@/src/layouts/page/page-layout';
import Banner from '@/src/components/banner/banner';
import Button from '@/src/components/button/button';
import Link from 'next/link';

const HomePage: React.FC = () => {
    return (
        <PageLayout>
            <Banner/>
            
            <h1>Home Page</h1>

            <Button>
                <Link href="/vocabulary">
                    Go to test page   
                </Link>
            </Button>
        </PageLayout>
    )
}

export default HomePage;
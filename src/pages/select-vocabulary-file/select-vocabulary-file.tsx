"use server"

import Button, { LinkButton } from '@/src/components/button/button';
import styles from './select-vocabulary-file.module.scss';
import Banner from "@/src/components/banner/banner";
import PageLayout from "@/src/layouts/page/page-layout";
import { getAllVocabularyFileNames } from '@/src/lib/language';
import Link from 'next/link';

const SelectVocabularyFilePage: React.FC = () => {
    const allFiles = getAllVocabularyFileNames();

    return (
        <PageLayout>
            <Banner/>

            <div className={styles.root}>
                <h1>Select Vocabulary File Page</h1>

                <ul className={styles.list}>
                    {
                        allFiles.map((item, key) => 
                            (<li className={styles.list_element} key={key}>
                                <Link href={`/vocabulary/${item}`}>{item}</Link>
                            </li>)
                        )
                    }
                </ul>

                <LinkButton href={`/vocabulary/all`}>I want everything</LinkButton>
            </div>
        </PageLayout>
    )
}

export default SelectVocabularyFilePage;
"use client"

import { Translation } from '@/src/models/language';
import styles from './vocabulary.module.scss';
import PageLayout from '@/src/layouts/page/page-layout';
import TranslationQuestion from '@/src/components/translation-question/translation-question';
import { useState } from 'react';
import Banner from '@/src/components/banner/banner';

interface IVocabularyPage {
    fileName?: string,
    translations: Translation[]
}

const VocabularyPage: React.FC<IVocabularyPage> = (props) => {
    const { translations } = props;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const handleGetNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    return (
        <PageLayout>
            <Banner/>
            <div className={styles.root}>
                { props.fileName && <h2 className={styles.current_file}>Current file: {props.fileName}</h2> }

                <div className={styles.content}>
                    <h1>{ currentQuestionIndex + 1 + " / " + translations.length}</h1>
                    
                    <TranslationQuestion 
                        onQuestionFinished={handleGetNextQuestion} 
                        translationObj={translations[currentQuestionIndex]}
                    />
                </div>
            </div>
        </PageLayout>
    )
}

export default VocabularyPage;
"use client"

import { Translation } from '@/src/models/language';
import styles from './translation-exercise.module.scss';
import PageLayout from '@/src/layouts/page/page-layout';
import TranslationQuestion from '@/src/components/translation-question/translation-question';
import { Fragment, useState } from 'react';
import Banner from '@/src/components/banner/banner';
import Button from '@/src/components/button/button';

interface IVocabularyPage {
    fileName?: string,
    translations: Translation[]
}

const TranslationExercisePage: React.FC<IVocabularyPage> = (props) => {
    const { translations } = props;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [reversed, setRevered] = useState<boolean>(false);

    const handleGetNextQuestion = () => {
        if (currentQuestionIndex + 1 < translations.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
    }

    const handleReverseOrder = () => {
        setRevered(!reversed)
    }

    return (
        <Fragment>
            <Banner/>

            <PageLayout>
                <div className='center'>
                    { props.fileName && <h2 className={styles.current_file}>Current file: {props.fileName}</h2> }

                    <Button onClick={handleReverseOrder}>Reverse order</Button>
                </div>

                <div className={styles.content}>
                    <h1>{ currentQuestionIndex + 1 + " / " + translations.length}</h1>
                    
                    <TranslationQuestion 
                        onQuestionFinished={handleGetNextQuestion} 
                        translationObj={translations[currentQuestionIndex]}
                        fieldsReveresed={reversed}
                    />
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default TranslationExercisePage;
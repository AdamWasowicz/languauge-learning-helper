"use client"

import { Translation } from '@/src/models/language';
import styles from './translation-exercise.module.scss';
import PageLayout from '@/src/layouts/page/page-layout';
import TranslationQuestion from '@/src/components/translation-question/translation-question';
import { Fragment, useState } from 'react';
import Banner from '@/src/components/banner/banner';
import Button from '@/src/components/button/button';
import { useRouter } from 'next/navigation';



interface IVocabularyPage {
    fileName?: string,
    translations: Translation[]
}

const TranslationExercisePage: React.FC<IVocabularyPage> = (props) => {
    const { translations } = props;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [reversed, setRevered] = useState<boolean>(false);
    const router = useRouter();

    const handleGetNextQuestion = () => {
        if (currentQuestionIndex + 1 < translations.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
    }

    const handleReverseOrder = () => {
        setRevered(!reversed)
    }

    const handleReset = () => {
        setCurrentQuestionIndex(0);
    }

    const handleRedirectToFileSelection = () => {
        router.push('/translations')
    }

    return (
        <Fragment>
            <Banner/>

            <PageLayout>
                <div className={styles.content}>
                    <div className='center'>
                        { props.fileName && <h2 className={styles.current_file}>Current file: {props.fileName}</h2> }

                        <div className={styles.control_panel}>
                            <Button className={styles.flex_grow_1} onClick={handleReverseOrder}>Reverse order</Button>
                            <Button className={styles.flex_grow_1} onClick={handleReset}>Reset questions</Button>
                            <Button className={styles.flex_grow_1} onClick={handleRedirectToFileSelection}>Go to file select</Button>
                        </div>
                    </div>

                    <h2 className={styles.counter}>{ currentQuestionIndex + 1 + " / " + translations.length }</h2>
                    
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
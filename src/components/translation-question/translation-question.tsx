"use client"

import { Translation } from '@/src/models/language';
import styles from './translation-question.module.scss';
import { useState } from 'react';

interface ITranslationQuestion {
    translationObj: Translation,
    onQuestionFinished: () => void
}

const TranslationQuestion: React.FC<ITranslationQuestion> = (props) => {
    const [showTranslation, setShowTranslation] = useState<boolean>(false);

    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        
        if (showTranslation === false) {
            setShowTranslation(true);
        }
        else {
            setShowTranslation(false);
            props.onQuestionFinished();
        }
    }

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div className={styles.column}>
                    <p className={styles.p}>
                        { props.translationObj.original }
                    </p>
                </div>

                <div className={styles.span_column}>
                    <span className={styles.span}>=</span>
                </div>

                <div className={styles.column}>
                    <p 
                        className={styles.p}
                        hidden={!showTranslation}
                    >
                        { props.translationObj.translation }
                    </p>
                </div>
            </div>

            <button 
                onClick={handleButtonClick}
                className={styles.button}
            >
                {showTranslation == false ? 'Show translation' : 'Next'}
            </button>
        </div>
    )
}

export default TranslationQuestion;
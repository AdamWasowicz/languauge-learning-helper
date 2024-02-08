"use server"

import Banner from "@/src/components/banner/banner";
import PageLayout from "@/src/layouts/page/page-layout";
import styles from './select-translation-exercise.module.scss';
import { Fragment } from "react";
import SelectFileForTranslations from "@/src/components/select-file-for-translations/select-file-for-translations";
import { getAllSentencesFileNames, getAllVocabularyFileNames, getAllSpecialFileNames } from "@/src/lib/language";

const SelectTranslationExercise: React.FC = () => {
    const vocabularyFiles = getAllVocabularyFileNames();
    const sentenceFiles = getAllSentencesFileNames();
    const specialFiles = getAllSpecialFileNames();

    return (
        <Fragment>
            <Banner/>

            <PageLayout className={styles.content}>
                <SelectFileForTranslations
                    label="Vocabulary"
                    urlPrefix="/translations/vocabulary"
                    fileNames={vocabularyFiles}
                />

                <SelectFileForTranslations
                    label="Sentences"
                    urlPrefix="/translations/sentence"
                    fileNames={sentenceFiles}
                />

                <SelectFileForTranslations
                    label="Special"
                    urlPrefix="/translations/special"
                    fileNames={specialFiles}
                />
            </PageLayout>
        </Fragment>
    )
}

export default SelectTranslationExercise;
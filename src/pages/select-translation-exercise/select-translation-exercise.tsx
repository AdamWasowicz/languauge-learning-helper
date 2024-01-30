"use server"

import Banner from "@/src/components/banner/banner";
import PageLayout from "@/src/layouts/page/page-layout";
import styles from './select-translation-exercise.module.scss';
import { Fragment } from "react";
import SelectFileForTranslations from "@/src/components/select-file-for-translations/select-file-for-translations";
import { getAllSentencesFileNames, getAllVocabularyFileNames } from "@/src/lib/language";

const SelectTranslationExercise: React.FC = () => {
    const vocabularyFiles = getAllVocabularyFileNames();
    const sentenceFile = getAllSentencesFileNames();

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
                    fileNames={sentenceFile}
                />
            </PageLayout>
        </Fragment>
    )
}

export default SelectTranslationExercise;
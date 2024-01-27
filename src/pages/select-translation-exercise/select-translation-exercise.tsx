"use server"

import Banner from "@/src/components/banner/banner";
import PageLayout from "@/src/layouts/page/page-layout";
import styles from './select-translation-exercise.module.scss';
import { Fragment } from "react";
import SelectFileForTranslations from "@/src/components/select-file-for-translations/select-file-for-translations";
import { getAllVocabularyFileNames } from "@/src/lib/language";

const SelectTranslationExercise: React.FC = () => {
    const vocabularyFiles = getAllVocabularyFileNames();

    return (
        <Fragment>
            <Banner/>

            <PageLayout>
                <SelectFileForTranslations
                    label="Select vocabulary file"
                    urlPrefix="/translations/vocabulary"
                    fileNames={vocabularyFiles}
                />
            </PageLayout>
        </Fragment>
    )
}

export default SelectTranslationExercise;
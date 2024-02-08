import { getSpecialsFromFiles, getVocabularyFromFiles } from "@/src/lib/language";
import { randomizeArray } from "@/src/lib/utils";
import TranslationExercisePage from "@/src/pages/translation-exercise/translation-exercise";

interface IPage {
    // files are in x, y format
    params: { fileNames: string }
}

const Page: React.FC<IPage> = (props) => {
    const fileNames: string[] = props.params.fileNames.split('%2C')
    const translations = getSpecialsFromFiles(fileNames);
    if (translations === undefined) { return (<h1>Redirect to error page or something</h1>) }

    const randomizedTranslations = randomizeArray(translations);
    return (<TranslationExercisePage fileName={fileNames.toString()} translations={randomizedTranslations}/>)
}

export default Page;
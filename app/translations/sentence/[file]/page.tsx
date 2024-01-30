import { getSentencesFromFile } from "@/src/lib/language";
import TranslationExercisePage from "@/src/pages/translation-exercise/translation-exercise";
import { getAllSentencesFileNames } from "@/src/lib/language";
import { randomizeArray } from "@/src/lib/utils";

interface IPage {
    params: { file: string }
}

const Page: React.FC<IPage> = (props) => {
    const translations = getSentencesFromFile(props.params.file);
    if (translations === undefined) { return (<h1>Redirect to error page or something</h1>) }

    const randomizedTranslations = randomizeArray(translations);
    return (<TranslationExercisePage fileName={props.params.file} translations={randomizedTranslations}/>)
}

export default Page;

export async function generateStaticParams() {
    const allFiles = getAllSentencesFileNames();
    const output = allFiles.map((item) => ({file: item}))
    return output;
}
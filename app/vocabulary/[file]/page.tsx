import { getVocabularyFromFile } from "@/src/lib/language";
import VocabularyPage from "@/src/pages/vocabulary/vocabulary";
import { getAllVocabularyFileNames } from "@/src/lib/language";
import { randomizeArray } from "@/src/lib/utils";

interface IPage {
    params: { file: string }
}

const Page: React.FC<IPage> = (props) => {
    const translations = getVocabularyFromFile(props.params.file);
    if (translations === undefined) { return (<h1>Redirect to error page or something</h1>) }

    const randomizedTranslations = randomizeArray(translations);
    return (<VocabularyPage fileName={props.params.file} translations={randomizedTranslations}/>)
}

export default Page;

export async function generateStaticParams() {
    const allFiles = getAllVocabularyFileNames();
    const output = allFiles.map((item) => ({file: item}))
    return output;
}
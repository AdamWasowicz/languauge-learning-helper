import { getAllSentences } from "@/src/lib/language";
import TranslationExercisePage from "@/src/pages/translation-exercise/translation-exercise";
import { randomizeArray } from "@/src/lib/utils";

const Page: React.FC = () => {
    const translations = randomizeArray(getAllSentences());
    return <TranslationExercisePage translations={translations}/>
}

export default Page;
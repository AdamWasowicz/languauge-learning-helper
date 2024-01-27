import { getAllVocabulary } from "@/src/lib/language";
import VocabularyPage from "@/src/pages/vocabulary/vocabulary";
import { randomizeArray } from "@/src/lib/utils";

const Page: React.FC = () => {
    const translations = randomizeArray(getAllVocabulary());
    return <VocabularyPage translations={translations}/>
}

export default Page;
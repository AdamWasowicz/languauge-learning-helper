"use server"

import { getAllVocabulary } from "@/src/lib/language";
import VocabularyPage from "@/src/pages/vocabulary/vocabulary";

const Page: React.FC = () => {
    const allVocabulary = getAllVocabulary();

    const randomise = (items: any[]) => {
        let currentIndex = items.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [items[currentIndex], items[randomIndex]] = [items[randomIndex], items[currentIndex]];
        }

        return items;
    }

    return (<VocabularyPage translations={randomise(allVocabulary)}/>)
}

export default Page;
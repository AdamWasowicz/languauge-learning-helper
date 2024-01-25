import { Translation } from "../models/language";
import { getAllFileNamesInDirectory, readTxt } from './utils';
import { PATH_TO_VOCABULARY, PATH_TO_SENTENCES } from './pathfinder';
import path from 'path';
import { VOCABULARY_SEPARATOR, SENCENCE_SEPARATOR } from "./settings";

const _getAllFromTranslationsFromFile = (pathToDirectory: string[], sepatator: string): Translation[] => {
    const allFileNames: string[] = getAllFileNamesInDirectory(path.join(process.cwd(), ...pathToDirectory))
    let vocabulary: Translation[] = [];

    allFileNames.forEach((fileName) => {
        const pathToFile = path.join(process.cwd(),...pathToDirectory, fileName)

        const fileContent = readTxt(pathToFile);
        if (fileContent === undefined) { return; }

        const linesInFile = fileContent?.split('\n');
        const translations: Translation[] = linesInFile.map((line) => {
            const split = line.split(VOCABULARY_SEPARATOR);
            if (split.length !== 2) {
                throw new Error(`[getAllFromTranslationsFromFile] line: "${line}" from file: "${fileName}" cannot be split using separator: "${sepatator}"`)
            }

            return {
                original: split[0].trim(),
                translation: split[1].trim()
            } satisfies Translation
        })

        vocabulary = [...vocabulary, ...translations];
    })

    return vocabulary
}

export const getAllVocabulary = (): Translation[] => {
    const allFileNames: string[] = getAllFileNamesInDirectory(path.join(process.cwd(),...PATH_TO_VOCABULARY))
    let vocabulary: Translation[] = [];

    allFileNames.forEach((fileName) => {
        const pathToFile = path.join(process.cwd(),...PATH_TO_VOCABULARY, fileName)

        const fileContent = readTxt(pathToFile);
        if (fileContent === undefined) { return; }

        const linesInFile = fileContent?.split('\n');
        const translations: Translation[] = linesInFile.map((line) => {
            const split = line.split(VOCABULARY_SEPARATOR);
            if (split.length !== 2) {
                throw new Error(`[getAllVocabulary] line: "${line}" from file: "${fileName}" cannot be split using separator: "${VOCABULARY_SEPARATOR}"`)
            }

            return {
                original: split[0].trim(),
                translation: split[1].trim()
            } satisfies Translation
        })

        vocabulary = [...vocabulary, ...translations];
    })

    return vocabulary
}

export const getAllSentences = (): Translation[] => {
    const allFileNames: string[] = getAllFileNamesInDirectory(path.join(process.cwd(),...PATH_TO_SENTENCES))
    let sentences: Translation[] = [];

    allFileNames.forEach((fileName) => {
        const pathToFile = path.join(process.cwd(),...PATH_TO_SENTENCES, fileName)

        const fileContent = readTxt(pathToFile);
        if (fileContent === undefined) { return; }

        const linesInFile = fileContent?.split('\n');
        const translations: Translation[] = linesInFile.map((line) => {
            const split = line.split(SENCENCE_SEPARATOR);
            if (split.length !== 2) {
                throw new Error(`[getAllSentences] line: "${line}" from file: "${fileName}" cannot be split using separator: "${SENCENCE_SEPARATOR}"`)
            }

            return {
                original: split[0].trim(),
                translation: split[1].trim()
            } satisfies Translation
        })

        sentences = [...sentences, ...translations];
    })

    return sentences
}

export const getAllVocabularyFileNames = (): string[] => {
    const allFileNames: string[] = getAllFileNamesInDirectory(path.join(process.cwd(),...PATH_TO_VOCABULARY))
    return allFileNames
}

export const getAllSentencesFileNames = (): string[] => {
    const allFileNames: string[] = getAllFileNamesInDirectory(path.join(process.cwd(),...PATH_TO_SENTENCES))
    return allFileNames
}
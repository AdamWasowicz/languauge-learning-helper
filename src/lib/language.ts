import { Translation } from "../models/language";
import { getAllFileNamesInDirectory, readTxt, doesFileExist,  } from './utils';
import { PATH_TO_VOCABULARY, PATH_TO_SENTENCES } from './pathfinder';
import path from 'path';
import { VOCABULARY_SEPARATOR, SENTENCE_SEPARATOR } from "./settings";

// Private
const _convertStringToTranslation = (content: string, separator: string): Translation[] => {
    const linesInFile = content.split('\n');

    const translations: Translation[] = linesInFile.map((line) => {
        const split = line.split(VOCABULARY_SEPARATOR);
        if (split.length !== 2) {
            throw new Error(`[_convertStringToTranslation] line: "${line}" cannot be split using separator: "${separator}"`)
        }

        return { original: split[0].trim(), translation: split[1].trim() } satisfies Translation
    })

    return translations;
}

const _getAllFromTranslationsFromFile = (pathToDirectory: string[], separator: string): Translation[] => {
    const allFileNames: string[] = getAllFileNamesInDirectory(path.join(process.cwd(), ...pathToDirectory))
    let vocabulary: Translation[] = [];

    allFileNames.forEach((fileName) => {
        const pathToFile = path.join(process.cwd(),...pathToDirectory, fileName)

        const fileContent = readTxt(pathToFile);
        if (fileContent === undefined) { return; }

        vocabulary = [...vocabulary, ..._convertStringToTranslation(fileContent, separator)];
    })

    return vocabulary
}

// Export
export const getVocabularyFromFile = (fileName: string): Translation[] | undefined => {
    const fileExists = doesFileExist(path.join(process.cwd(),...PATH_TO_VOCABULARY))
    if (fileExists === false) { return undefined }

    const fileContent = readTxt(path.join(process.cwd(), ...PATH_TO_VOCABULARY, fileName))
    if (fileContent === undefined) { return undefined }

    const tranlations = _convertStringToTranslation(fileContent, VOCABULARY_SEPARATOR);
    return tranlations;
}

export const getSentencesFromFile = (fileName: string): Translation[] | undefined => {
    const fileExists = doesFileExist(path.join(process.cwd(),...PATH_TO_SENTENCES))
    if (fileExists === false) { return undefined }

    const fileContent = readTxt(path.join(process.cwd(), ...PATH_TO_SENTENCES, fileName))
    if (fileContent === undefined) { return undefined }

    const tranlations = _convertStringToTranslation(fileContent, SENTENCE_SEPARATOR);
    return tranlations;
}

export const getAllVocabulary = (): Translation[] => {
    return _getAllFromTranslationsFromFile(PATH_TO_VOCABULARY, VOCABULARY_SEPARATOR);
}

export const getAllSentences = (): Translation[] => {
    return _getAllFromTranslationsFromFile(PATH_TO_SENTENCES, SENTENCE_SEPARATOR);
}

export const getAllVocabularyFileNames = (): string[] => {
    const allFileNames: string[] = getAllFileNamesInDirectory(path.join(process.cwd(),...PATH_TO_VOCABULARY))
    return allFileNames
}

export const getAllSentencesFileNames = (): string[] => {
    const allFileNames: string[] = getAllFileNamesInDirectory(path.join(process.cwd(),...PATH_TO_SENTENCES))
    return allFileNames
}
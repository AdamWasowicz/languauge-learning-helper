import { Translation } from "../models/language";
import { getAllFileNamesInDirectory, readTxt, doesFileExist, saveJson, saveStringToFile, deleteFile,  } from './utils';
import { PATH_TO_VOCABULARY, PATH_TO_SENTENCES, PATH_TO_SPECIAL } from './pathfinder';
import path from 'path';
import { VOCABULARY_SEPARATOR, SENTENCE_SEPARATOR, CONVERT_INDICATOR, CONVERT_ENABLED } from "./settings";

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

const _getTranlationsFromFiles = (absolutePaths: string[], separator: string): Translation[] => {
    const trans = absolutePaths.map((file) => {
        const fileContent = readTxt(file)
        if (fileContent === undefined) { return [] }

        const tranlations = _convertStringToTranslation(fileContent, VOCABULARY_SEPARATOR);
        return tranlations;
    })

    return trans.flat();
}

const _getAllTranslationsFromDirectory = (pathToDirectory: string[], separator: string): Translation[] => {
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

const _convertFileToTranslationFormat = (absolutePath: string, separator: string): Translation[] | undefined => {
    const fileExists = doesFileExist(absolutePath);
    if (fileExists === false) { return undefined; }

    const fileContent = readTxt(absolutePath);
    if (fileContent === undefined) { return undefined; }

    // Read and format file content
    const parts = fileContent
        ?.split('\n')
        .filter((item) => (item !== '') ? true : false)
        .filter((item) => (item !== ' 	') ? true : false)

    // Map
    const parts_length = parts.length;
    const trans = Array<Translation>(parts_length);
    for (let i = 0; i < parts_length; i = i + 2) {
        trans[i / 2] = {
            original: parts[i + 1],
            translation: parts[i]
        } satisfies Translation
    }
    
    return trans;
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

export const getVocabularyFromFiles = (fileNames: string[]): Translation[] | undefined => {
    const fNames = fileNames.map((item) => {
        return path.join(process.cwd(), ...PATH_TO_VOCABULARY, item)
    })

    const trans = _getTranlationsFromFiles(fNames, VOCABULARY_SEPARATOR)
    return trans;
}

export const getSentencesFromFile = (fileName: string): Translation[] | undefined => {
    const fileExists = doesFileExist(path.join(process.cwd(),...PATH_TO_SENTENCES))
    if (fileExists === false) { return undefined }

    const fileContent = readTxt(path.join(process.cwd(), ...PATH_TO_SENTENCES, fileName))
    if (fileContent === undefined) { return undefined }

    const tranlations = _convertStringToTranslation(fileContent, SENTENCE_SEPARATOR);
    return tranlations;
}

export const getSentencesFromFiles = (fileNames: string[]): Translation[] | undefined => {
    const fNames = fileNames.map((item) => {
        return path.join(process.cwd(), ...PATH_TO_SENTENCES, item)
    })

    const trans = _getTranlationsFromFiles(fNames, SENTENCE_SEPARATOR)
    return trans;
}

export const getAllVocabulary = (): Translation[] => {
    return _getAllTranslationsFromDirectory(PATH_TO_VOCABULARY, VOCABULARY_SEPARATOR);
}

export const getAllSentences = (): Translation[] => {
    return _getAllTranslationsFromDirectory(PATH_TO_SENTENCES, SENTENCE_SEPARATOR);
}

export const getAllVocabularyFileNames = (): string[] => {
    const allFileNames: string[] = getAllFileNamesInDirectory(path.join(process.cwd(),...PATH_TO_VOCABULARY))
    return allFileNames
}

export const getAllSentencesFileNames = (): string[] => {
    const allFileNames: string[] = getAllFileNamesInDirectory(path.join(process.cwd(),...PATH_TO_SENTENCES))
    return allFileNames
}

export const convertVocabularyFilesToTranslationFormat = () => {
    if (CONVERT_ENABLED === false) { return }

    const allFileNamesForConvertion = getAllFileNamesInDirectory(path.join(process.cwd(), ...PATH_TO_VOCABULARY));
    const filteredFileNames = allFileNamesForConvertion.filter((item) => item.split('.')[1] === CONVERT_INDICATOR)
    
    filteredFileNames.forEach((item) => {
        const t = _convertFileToTranslationFormat(
            path.join(process.cwd(), ...PATH_TO_VOCABULARY, item),
            VOCABULARY_SEPARATOR
        )
        if (t === undefined) { return; }

        const fileName = item.split('.')[0] + "." + item.split('.')[2];
        let d = t.map((item) =>`${item.translation} = ${item.original}\n`)
            .reduce((prev, curr) => prev + curr)
        d = d.substring(0, d.length - 1);

        const p = path.join(process.cwd(),...PATH_TO_VOCABULARY, fileName)
        const po = path.join(process.cwd(),...PATH_TO_VOCABULARY, item)

        saveStringToFile(d, p)
        deleteFile(po);
    })
}

export const findDerDieDasAndDoSomethingIdontReallyCare = () => {
    const allVocabulary: Translation[] = getAllVocabulary();

    const filtered = allVocabulary.filter((item) => {
        const split = item.original.split(' ');
        return split.length === 2 && (split[0] === "der" || split[0] === "die" || split[0] === "das")
    })

    // Convert to string
    let output: string = ""
    for (let i = 0; i < filtered.length - 1; i++) {
        output += `${filtered[i].original} ${VOCABULARY_SEPARATOR} ${filtered[i].translation}\n`
    }
    output += `${filtered[filtered.length - 1].original} ${VOCABULARY_SEPARATOR} ${filtered[filtered.length - 1].translation}`

    // Save
    saveStringToFile(output, path.join(process.cwd(), ...PATH_TO_SPECIAL, 'der_die_das.txt'))
}

export const getDerDieDas = (): Translation[] => {
    const filePath = [path.join(process.cwd(), ...PATH_TO_SPECIAL, 'der_die_das.txt')]
    const data = _getTranlationsFromFiles(filePath, VOCABULARY_SEPARATOR)
    return data;
}

export const getSpecialsFromFiles = (fileNames: string[]): Translation[] => {
    const aPaths = fileNames.map((item) => path.join(process.cwd(), ...PATH_TO_SPECIAL, item))
    const data = _getTranlationsFromFiles(aPaths, VOCABULARY_SEPARATOR);
    return data;
}

export const getAllSpecialFileNames = (): string[] => {
    const data = getAllFileNamesInDirectory(path.join(process.cwd(), ...PATH_TO_SPECIAL));
    return data;
}
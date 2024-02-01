import fs from 'fs';

/** 
 * @param absolutePath absolute path to directory
 * @returns array of all files(with extensions) in specified location 
 * */
export const getAllFileNamesInDirectory = (absolutePath: string): string[] => {
    const fileNamesList: string[] = fs.readdirSync(absolutePath);
    return fileNamesList;
}

/**
 * @param absolutePath absolute path to file
 * @returns true if file under specfied path exists
 */
export const doesFileExist = (absolutePath: string): boolean => {
    try {
        fs.accessSync(absolutePath);
        return true;
    }
    catch {
        return false;
    }
}

/**
 * Reads file and parses it to JSON format
 * @param absolutePath absolute path to file
 * @returns JSON
 */
export const readJson = (absolutePath: string): object | undefined => {
    try {
        const rawData = fs.readFileSync(absolutePath, 'utf-8');
        const json = JSON.parse(rawData);
        return json;
    }
    catch (exception) {
        return undefined;
    }
}

/**
 * Reads file and parses it to JSON format
 * @param absolutePath absolute path to file
 * @returns file content as string
 */
export const readTxt = (absolutePath: string): string | undefined => {
    try {
        const rawData = fs.readFileSync(absolutePath, 'utf-8');
        return rawData;
    }
    catch (exception) {
        return undefined;
    }
}

/**
 * Saves object as JSON in specified location
 * @param data data to be saved
 * @param absolutePath absolute path with name of the file
 */
export const saveJson = (data: object, absolutePath: string) => {
    const json = JSON.stringify(data);
    fs.writeFileSync(absolutePath, json, 'utf8')
}

export const saveArrayToFile = (data: string, absolutePath: string) => {
    fs.writeFileSync(absolutePath, data, 'utf-8');
}

export const randomizeArray = (items: any[]): any[] =>{
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

export const deleteFile = (absolutePath: string) => {
    fs.rmSync(absolutePath);
}
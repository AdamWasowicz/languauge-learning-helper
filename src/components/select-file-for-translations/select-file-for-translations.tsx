"use client"

import Link from 'next/link';
import styles from './select-file-for-translations.module.scss';
import { LinkButton } from '../button/button';
import { useState } from 'react';

interface ISelectFileForTranslations {
    label: string,
    fileNames: string[],
    urlPrefix: string,
    noRunSelectedButton?: boolean
}

const SelectFileForTranslations: React.FC<ISelectFileForTranslations> = (props) => {
    const displayRunSelected = props.noRunSelectedButton ?? true;
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

    const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>, fileName: string) => {
        if (event.target.checked === true) {
            setSelectedFiles([...selectedFiles, fileName])
        }
        else { 
            const newSelectedFiles = selectedFiles.filter((item) => item !== fileName)
            setSelectedFiles(newSelectedFiles)
        }
    }

    // If no fileNames were pased
    if (props.fileNames.length === 0) {
        return (
            <div className={styles.root}>
                <h2 className={styles.h2}>{props.label}</h2>
                <p>No files found</p>
            </div>
        )
    }

    return (
        <div className={styles.root}>
            <h2 className={styles.h2}>{props.label}</h2>

            <ul className={styles.list}>
                    {
                        props.fileNames.map((item, key) => 
                            (
                                <li className={styles.list_element} key={key}>
                                    { displayRunSelected && <input type="checkbox" onChange={(event) => handleCheckboxClick(event, item)}></input> }
                                    <Link href={`${props.urlPrefix}/selected/${item}`}>{item}</Link>
                                </li>
                            )
                        )
                    }
            </ul>

            <div className={styles.control_panel}>
                <LinkButton href={`${props.urlPrefix}/all`}>I want everything</LinkButton>
                { displayRunSelected && <LinkButton disabled={selectedFiles.length === 0} href={`${props.urlPrefix}/selected/${selectedFiles}`}>I want selected</LinkButton>}
            </div>
        </div>
    )
}

export default SelectFileForTranslations;
import Link from 'next/link';
import styles from './select-file-for-translations.module.scss';
import { LinkButton } from '../button/button';

interface ISelectFileForTranslations {
    label: string,
    fileNames: string[],
    urlPrefix: string
}

const SelectFileForTranslations: React.FC<ISelectFileForTranslations> = (props) => {
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
                            (<li className={styles.list_element} key={key}>
                                <Link href={`${props.urlPrefix}/${item}`}>{item}</Link>
                            </li>)
                        )
                    }
            </ul>

            <LinkButton href={`${props.urlPrefix}/all`}>I want everything</LinkButton>
        </div>
    )
}

export default SelectFileForTranslations;
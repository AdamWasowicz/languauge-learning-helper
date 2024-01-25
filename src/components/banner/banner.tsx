import styles from './banner.module.scss';
import Link from 'next/link';

const Banner: React.FC = () => {
    return (
        <div className={styles.root}>
            <h1 className={styles.h1}>
                <Link href={'/'} className={styles.link}>
                    Language-Learning-Helper
                </Link> 
            </h1>
        </div>
    )
}

export default Banner;
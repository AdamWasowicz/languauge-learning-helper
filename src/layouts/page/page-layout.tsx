import styles from './page-layout.module.scss';

interface IPageLayout {
    children: React.ReactNode | React.ReactNode[],
    className?: string
}

const PageLayout: React.FC<IPageLayout> = (props) => {
    return (
        <div className={styles.root + " " + props.className}>
            {props.children}
        </div>
    )
}

export default PageLayout;
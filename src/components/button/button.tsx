import styles from './button.module.scss';

interface IButton {
    onClick?: () => void,
    children: string | JSX.Element | JSX.Element[]
    disabled?: boolean
}

const Button: React.FC<IButton> = (props) => {

    return (
        <button 
            className={styles.root}
            onClick={props.onClick}
            disabled={props.disabled ?? false}
        >
            { props.children }
        </button>
    )
}

export default Button;
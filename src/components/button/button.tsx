import Link from 'next/link';
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

interface ILinkButton {
    href: string,
    children: string | JSX.Element | JSX.Element[]
    disabled?: boolean
}

export const LinkButton: React.FC<ILinkButton> = (props) => {
    return (
        <button 
            className={styles.link_button}
            disabled={props.disabled ?? false}
        >
            <Link href={props.href}>{ props.children }</Link>
        </button>
    )
}

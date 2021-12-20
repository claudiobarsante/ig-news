import { IconBaseProps } from 'react-icons';
import styles from './styles.module.scss';
export type ButtonProps = {
	type: 'button';
	onClick: () => void;
	icon: JSX.Element;
	state: 'logedIn' | 'logedOut';
	text: string;
};
const Button = ({ type, icon, state, text, onClick }: ButtonProps) => {
	return (
		<>
			<button type={type} onClick={onClick} className={styles['button']}>
				{icon}
				<span>teste</span>
			</button>
		</>
	);
};

export default Button;

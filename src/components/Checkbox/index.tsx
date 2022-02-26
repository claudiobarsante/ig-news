import styles from 'templates/Posts/posts.module.scss';

type CheckboxProps = {
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isChecked: boolean;
	label: string;
};
const CheckBox = ({ name, onChange, isChecked, label }: CheckboxProps) => {
	return (
		<label className={styles['checkbox-item']}>
			<input type='checkbox' name={name} onChange={onChange} checked={isChecked} />
			<span>{label}</span>
		</label>
	);
};

export default CheckBox;

import { InputHTMLAttributes, useCallback, useState } from 'react';
import styles from 'templates/Posts/posts.module.scss';
import checkboxStyles from './checkbox.module.scss';

type CheckboxProps = {
	name: string;
	onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isChecked: boolean;
	label: string;
	labelFor: string;
	id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const CheckBox = ({ name, onCheck, isChecked = false, label, labelFor, id }: CheckboxProps) => {
	const [checked, setChecked] = useState(isChecked);

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(checked => !checked);
		onCheck(event);
	}, []);

	return (
		<label data-testid='label' htmlFor={labelFor} className={styles['checkbox-item']}>
			<input
				data-testid={id}
				className={checkboxStyles['checkbox']}
				type='checkbox'
				name={name}
				onChange={handleChange}
				checked={checked}
			/>
			<span>{label}</span>
		</label>
	);
};

export default CheckBox;

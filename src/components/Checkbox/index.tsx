import { InputHTMLAttributes, useCallback, useState } from 'react';
import styles from 'templates/Posts/posts.module.scss';
import checkboxStyles from './checkbox.module.scss';

type CheckboxProps = {
	name: string;
	onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isChecked: boolean;
	label: string;
	labelFor: string;
	value?: string | ReadonlyArray<string> | number;
} & InputHTMLAttributes<HTMLInputElement>;

const CheckBox = ({
	name,
	onCheck,
	isChecked = false,
	label,
	labelFor,
	value,
	...props
}: CheckboxProps) => {
	const [checked, setChecked] = useState(isChecked);

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(checked => !checked);
		onCheck(event);
	}, []);

	return (
		<div className={styles['checkbox-item']}>
			<input
				id={labelFor}
				className={checkboxStyles['checkbox']}
				type='checkbox'
				name={name}
				onChange={handleChange}
				checked={checked}
				value={value}
				{...props}
			/>
			<label htmlFor={labelFor}>{label}</label>
		</div>
	);
};

export default CheckBox;

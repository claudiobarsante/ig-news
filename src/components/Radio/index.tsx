import { useState, useCallback } from 'react';
import { InputHTMLAttributes } from 'react';
// -- Styles
import styles from 'templates/Posts/posts.module.scss';
import radioStyles from './radio.module.scss';

type RadioValue = string | ReadonlyArray<string> | number;

type RadioProps = {
	id: string;
	label: string;
	name: string;
	value: RadioValue;
	onCheck: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const Radio = ({ id, value, label, onCheck, ...props }: RadioProps) => {
	const handleOnChange = (value: string) => {
		onCheck(value);
	};
	return (
		<div key={id} className={styles['orderBy__radio']}>
			<input
				id={id}
				className={radioStyles['radio']}
				type='radio'
				value={value}
				{...props}
				onChange={() => handleOnChange(String(value))}
			/>
			<label data-testid='label' htmlFor={id}>
				{label}
			</label>
		</div>
	);
};

export default Radio;

import { useState, useCallback } from 'react';
import { InputHTMLAttributes } from 'react';
// -- Styles
import styles from 'templates/Posts/posts.module.scss';

type RadioValue = string | ReadonlyArray<string> | number;

type RadioProps = {
	id: string;
	label: string;
	name: string;
	value: RadioValue;
	onLabelClick: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const Radio = ({ id, value, label, onLabelClick, ...props }: RadioProps) => {
	return (
		<div key={id} className={styles['orderBy__radio']}>
			<input type='radio' value={value} {...props} />
			<label htmlFor={id} onClick={() => onLabelClick(String(value))}>
				{label}
			</label>
		</div>
	);
};

export default Radio;

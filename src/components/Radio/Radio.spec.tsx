import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

import Radio from '.';

describe('<Radio/>', () => {
	it('should render <Radio/>', async () => {
		const handleRadioChange = jest.fn();
		render(
			<Radio
				id='cl03xm53jjhhc0goh3v866rds'
				label='Newest first'
				name='postsOrderBy'
				value='publishedAt_DESC'
				onCheck={() => handleRadioChange('publishedAt_DESC')}
			/>
		);

		const label = screen.getByText('Newest first');
		expect(label).toBeInTheDocument();

		userEvent.click(label);
		await waitFor(() => {
			expect(handleRadioChange).toHaveBeenCalledTimes(1);
		});
		expect(handleRadioChange).toHaveBeenCalledWith('publishedAt_DESC');
	});

	it('Should be accessible with tab', () => {
		const handleRadioChange = jest.fn();
		render(
			<Radio
				id='cl03xm53jjhhc0goh3v866rds'
				label='Newest first'
				name='postsOrderBy'
				value='publishedAt_DESC'
				onCheck={() => handleRadioChange('publishedAt_DESC')}
			/>
		);

		const radio = screen.getByRole('radio');

		expect(document.body).toHaveFocus();

		userEvent.tab();

		expect(radio).toHaveFocus();
	});

	it('should have property check = true when value === mock', () => {
		const realUseState = React.useState;

		const stubInitialState = ['publishedAt_DESC'];
		// Mock useState before rendering your component
		jest.spyOn(React, 'useState').mockImplementationOnce(() => realUseState(stubInitialState));

		const handleRadioChange = jest.fn();
		render(
			<Radio
				id='cl03xm53jjhhc0goh3v866rds'
				label='Newest first'
				name='postsOrderBy'
				value='publishedAt_DESC'
				defaultChecked={stubInitialState[0] === 'publishedAt_DESC'}
				onCheck={() => handleRadioChange('publishedAt_DESC')}
			/>
		);

		const radio = screen.getByRole('radio');
		expect(radio).toBeChecked();
	});
});

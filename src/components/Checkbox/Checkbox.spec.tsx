import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '.';

describe('Checkbox', () => {
	it('should render <Checkbox/>', () => {
		const handleCheckboxChange = jest.fn();
		const { container, debug } = render(
			<Checkbox
				isChecked={true}
				label='Programming'
				labelFor='programming'
				name='programming'
				onCheck={handleCheckboxChange}
			/>
		);
		//debug(container);
		expect(screen.getByRole('checkbox')).toBeInTheDocument();
		// from associated label
		expect(screen.getByLabelText(/programming/i)).toBeInTheDocument();
		//text from label
		expect(screen.getByText(/programming/i)).toHaveAttribute('for', 'programming');
	});

	it('should call handleCheckboxChange when status change', async () => {
		const handleCheckboxChange = jest.fn();

		render(
			<Checkbox
				isChecked={true}
				label='Programming'
				labelFor='programming'
				name='programming'
				onCheck={handleCheckboxChange}
			/>
		);

		userEvent.click(screen.getByRole('checkbox'));
		await waitFor(() => {
			expect(handleCheckboxChange).toHaveBeenCalledTimes(1);
		});
	});

	it('should be accessible with tab', () => {
		const handleCheckboxChange = jest.fn();
		render(
			<Checkbox
				isChecked={true}
				label='Programming'
				labelFor='programming'
				name='programming'
				onCheck={handleCheckboxChange}
			/>
		);

		//first the page has the focus
		expect(document.body).toHaveFocus();

		userEvent.tab();
		expect(screen.getByRole('checkbox')).toHaveFocus();
	});
});

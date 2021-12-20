import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { ButtonProps } from '.';
import { FaGithub } from 'react-icons/fa';
import React from 'react';

export default {
	title: 'Default Button',
	component: Button,
	args: {
		type: 'button',
		icon: <FaGithub />,
		state: 'logedIn',
		text: 'User name',
	},
	argTypes: {
		onClick: { action: 'cliked' },
	},
} as Meta;

export const Default: Story<ButtonProps> = args => <Button {...args} />;

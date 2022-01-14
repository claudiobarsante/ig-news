import Link, { LinkProps } from 'next/link';
import { ReactElement, cloneElement } from 'react';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
	children: ReactElement;
	activeClassName: string;
}
export default function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps) {
	const { asPath } = useRouter(); //route that you're currently accessing
	/*if the route that you're currently accessing is equal to the href that you're passing as parameter, then the link is active*/
	const className = asPath === rest.href ? activeClassName : '';
	return (
		// -- you cant'add directly a className or anything to a children, so you have to clone it first
		// -- and then add
		<Link {...rest}>{cloneElement(children, { className })}</Link>
	);
}

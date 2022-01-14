import { ParsedUrlQueryInput } from 'querystring';
import { FilterItemsTypes } from 'templates/Posts';
// type Filter = {
// 	name: string;
// 	type: string;
// };
type ParseArgs = {
	queryString: ParsedUrlQueryInput;
	filterItems: FilterItemsTypes[];
};

export const parseQueryStringToWhere = ({ queryString, filterItems }: ParseArgs) => {
	const obj: any = {};

	Object.keys(queryString)
		.filter(key => key !== 'orderBy')
		.forEach(key => {
			const item = filterItems?.find(item => item.name === key);
			const isCheckbox = item?.type === 'checkbox';
			const isRadio = item?.type === 'radio';
			const isArray = Array.isArray(queryString[key]);

			if (isArray && isCheckbox) obj[key] = { name_in: queryString[key] };
			if (!isArray && isCheckbox) obj[key] = { name: queryString[key] };
			if (isRadio) obj[key] = { name: queryString[key] };
		});

	return obj;
};

export const parseQueryStringToFilter = ({ queryString, filterItems }: ParseArgs) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const obj: any = {};

	Object.keys(queryString).forEach(key => {
		const item = filterItems?.find(item => item.name === key);
		const isCheckbox = item?.type === 'checkbox';
		const isArray = Array.isArray(queryString[key]);

		obj[key] = !isArray && isCheckbox ? [queryString[key]] : queryString[key];
	});

	return obj;
};

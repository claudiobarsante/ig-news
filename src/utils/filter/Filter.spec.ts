import { parseQueryStringToFilter, parseQueryStringToWhere } from '.';
import { filterItems } from '../../pages/posts';
// const filterItems = [
// 	{ name: 'category', type: 'checkbox' },
// 	{ name: 'author', type: 'checkbox' },
// 	{ name: 'orderBy', type: 'radio' },
// ];

// publishedAt_ASC
//orderBy: 'publishedAt_ASC',
// publishedAt_DESC
const queryString = {
	category: ['Testing', 'Programming'],
	author: 'Mark Richards',
	orderBy: 'publishedAt_ASC',
};

describe('parseQueryStringToWhere()', () => {
	it('should parse queryString to where format', () => {
		const parsedQuery = parseQueryStringToWhere({ queryString, filterItems });

		expect(parsedQuery).toStrictEqual({
			category: { name_in: ['Testing', 'Programming'] },
			author: { name: 'Mark Richards' },
		});
	});
});

describe('parseQueryStringToFilter()', () => {
	it('should parse queryString to filter values format', () => {
		const parsedQuery = parseQueryStringToFilter({ queryString, filterItems });

		expect(parsedQuery).toStrictEqual({
			category: ['Testing', 'Programming'],
			author: ['Mark Richards'],
			orderBy: 'publishedAt_ASC',
		});
	});
});

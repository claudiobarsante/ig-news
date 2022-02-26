import {
	QueryPostsPage_categories,
	QueryPostsPage_filters,
} from 'graphql/generated/QueryPostsPage';

export type Category = {
	[name: string]: boolean;
};

export type FilterItemsTypes = {
	name: string;
	type: 'checkbox' | 'radio';
};

export type PostsPageProps = {
	filterItems: FilterItemsTypes[];
	postsCategories: QueryPostsPage_categories[];
	postsFilters: QueryPostsPage_filters[];
};

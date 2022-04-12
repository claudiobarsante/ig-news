import { GetServerSideProps, GetServerSidePropsContext } from 'next';
// --Graphql
import { initializeApollo } from 'graphql/lib/apolloClient';
import { QUERY_POSTS_PAGE } from 'graphql/queries';
import { PostOrderByInput } from 'graphql/generated/globalTypes';
import { QueryPostsPage, QueryPostsPageVariables } from 'graphql/generated/QueryPostsPage';
// -- Utils
import { parseQueryStringToWhere } from 'utils/filter';
// -- Templates
import PostsPageTemplate, { DEFAULT_LENGTH } from 'templates/Posts';
// - Types
import { FilterItemsTypes, PostsPageProps } from 'templates/Posts/types';

const Posts = ({ filterItems }: PostsPageProps) => (
	<PostsPageTemplate
		filterItems={filterItems}
		//postsCategories={postsCategories}
		//postsFilters={postsFilters}
	/>
);

export default Posts;

export const getServerSideProps: GetServerSideProps = async ({
	query,
}: GetServerSidePropsContext) => {
	const FILTER_ITEMS: FilterItemsTypes[] = [
		{ name: 'category', type: 'checkbox' },
		{ name: 'author', type: 'checkbox' },
		{ name: 'orderBy', type: 'radio' },
	];
	console.log('query-server', query);
	const apolloClient = initializeApollo();

	const { error } = await apolloClient.query<QueryPostsPage, QueryPostsPageVariables>({
		query: QUERY_POSTS_PAGE,
		variables: {
			first: DEFAULT_LENGTH,
			skip: 0,
			where: parseQueryStringToWhere({ queryString: query, filterItems: FILTER_ITEMS }),
			orderBy: PostOrderByInput.publishedAt_DESC,
		},
	});

	const errorCode = 'teste';
	if (error) {
		return {
			redirect: {
				destination: `/error/${errorCode}`,
				permanent: false,
			},
		};
	}

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(), //initial load to cache
			filterItems: FILTER_ITEMS,
			//postsCategories: data.categories,
			//postsFilters: data.filters,
		},
	};
};

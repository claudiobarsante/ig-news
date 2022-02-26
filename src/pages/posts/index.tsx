import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { initializeApollo } from 'graphql/lib/apolloClient';
import { LOAD_MORE_POSTS_QUERY, QUERY_POSTS_PAGE } from 'graphql/queries';
import { LoadMorePosts, LoadMorePostsVariables } from 'graphql/generated/LoadMorePosts';
import { parseQueryStringToWhere } from 'utils/filter';
import { PostOrderByInput } from '../../graphql/generated/globalTypes';
import PostsPageTemplate, {
	DEFAULT_LENGTH,
	FilterItemsTypes,
	PostsPageProps,
} from 'templates/Posts';
import { QueryPostsPage, QueryPostsPageVariables } from 'graphql/generated/QueryPostsPage';

const Posts = ({ filterItems, postsCategories, postsFilters }: PostsPageProps) => (
	<PostsPageTemplate
		filterItems={filterItems}
		postsCategories={postsCategories}
		postsFilters={postsFilters}
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

	const apolloClient = initializeApollo();

	const { data, error } = await apolloClient.query<QueryPostsPage, QueryPostsPageVariables>({
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
			postsCategories: data.categories,
			postsFilters: data.filters,
		},
	};
};

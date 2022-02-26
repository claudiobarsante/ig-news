import { PostOrderByInput } from '../../graphql/generated/globalTypes';
import { LOAD_MORE_POSTS_QUERY } from '../../graphql/queries';

export const postMock = {
	request: {
		query: LOAD_MORE_POSTS_QUERY,
		variables: {
			first: 3,
			skip: 0,
			where: {},
			orderBy: PostOrderByInput.publishedAt_DESC,
		},
	},
	result: jest.fn().mockReturnValue({
		data: {
			posts: [
				{
					__typename: 'Post',
					id: 'id1',
					updatedAt: '2021-12-20T17:50:39.983534+00:00',
					slug: 'slug1',
					name: 'test1',
					content: { __typename: 'RichText', html: '<p>eeeeeeeeee</p>' },
				},
			],
			postsConnection: {
				aggregate: {
					count: 12,
				},
			},
		},
	}),
};

export const postFetchMoreMock = {
	request: {
		query: LOAD_MORE_POSTS_QUERY,
		variables: {
			first: 3,
			skip: 1,
			where: {},
			orderBy: PostOrderByInput.publishedAt_DESC,
		},
	},
	result: jest.fn().mockReturnValue({
		data: {
			posts: [
				{
					__typename: 'Post',
					id: 'id2',
					updatedAt: '2021-12-20T17:50:39.983534+00:00',
					slug: 'slug2',
					name: 'test2',
					content: { __typename: 'RichText', html: '<p>eeeeeeeeee</p>' },
				},
			],
			postsConnection: {
				aggregate: {
					count: 12,
				},
			},
		},
	}),
};

export const categoriesMock = [
	{
		__typename: 'Category',
		id: 'ckxi3ghcg5a5f0e82mlg4ymvl',
		label: 'Programming',
		name: 'programming',
		formType: 'checkbox',
	},
	{
		__typename: 'Category',
		id: 'ckxi3gw085omf0d7611dbmbzk',
		label: 'Testing',
		name: 'testing',
		formType: 'checkbox',
	},
	{
		__typename: 'Category',
		id: 'ckxjc1m2gx2vi0d768pygs9ju',
		label: 'DevOps',
		name: 'devops',
		formType: 'checkbox',
	},
];

export const filtersMock = [
	{
		__typename: 'Filter',
		id: 'cl03xm53jjhhc0goh3v866rds',
		label: 'Newest first',
		name: 'postsOrderBy',
		value: 'publishedAt_ASC',
	},
	{
		__typename: 'Filter',
		id: 'cl03xqeajjh9w0aodoxq94vpr',
		label: 'Oldest first',
		name: 'postsOrderBy',
		value: 'publishedAt_DESC',
	},
];

export const allPosts = [
	{
		__typename: 'Post',
		id: 'ckxjc2rqgwimt0e82jas9u0pm',
		updatedAt: '2021-12-23T19:04:01.108814+00:00',
		slug: 'esse-e-de-devops',
		name: 'Esse é de DevOps',
		content: { __typename: 'RichText', html: '<p>Esse post é de DevOps</p>' },
	},
	{
		__typename: 'Post',
		id: 'ckxj2vht4qjkw0d76cavnmxtz',
		updatedAt: '2021-12-23T14:46:25.302158+00:00',
		slug: 'dfgdfgdfg',
		name: 'dfgdfgdfg',
		content: { __typename: 'RichText', html: '<p>John Castle programming</p>' },
	},
	{
		__typename: 'Post',
		id: 'ckwp9gliogx010d752hnh16rp',
		updatedAt: '2021-12-22T22:29:06.516737+00:00',
		slug: 'the-best-thing',
		name: 'The best thing',
		content: {
			__typename: 'RichText',
			html: '<h5>Parâmetros</h5><p>posicaoInicial é a posição inicial a partir da qual o trecho deve ser selecionado. Pode receber valores negativos. Neste caso a contagem dos caracteres deve começar da direita para a esquerda.</p><p>posicaoFinal é a posição final, até onde o trecho da string ou do array deve ser selecionado -1, isto é, posição excludente. Esse parâmetro é opcional. Pode receber valores negativos. Neste caso a contagem dos caracteres deve começar da direita para a esquerda.</p><h5>Valor de retorno</h5><p>É retornada a nova string ou o novo array selecionado.</p>',
		},
	},
	{
		__typename: 'Post',
		id: 'ckxjc2rqgwimt0e82jas9u0pm',
		updatedAt: '2021-12-23T19:04:01.108814+00:00',
		slug: 'esse-e-de-devops',
		name: 'Esse é de DevOps',
		content: { __typename: 'RichText', html: '<p>Esse post é de DevOps</p>' },
	},
	{
		__typename: 'Post',
		id: 'ckxj2vht4qjkw0d76cavnmxtz',
		updatedAt: '2021-12-23T14:46:25.302158+00:00',
		slug: 'dfgdfgdfg',
		name: 'dfgdfgdfg',
		content: { __typename: 'RichText', html: '<p>John Castle programming</p>' },
	},
	{
		__typename: 'Post',
		id: 'ckwp9gliogx010d752hnh16rp',
		updatedAt: '2021-12-22T22:29:06.516737+00:00',
		slug: 'the-best-thing',
		name: 'The best thing',
		content: {
			__typename: 'RichText',
			html: '<h5>Parâmetros</h5><p>posicaoInicial é a posição inicial a partir da qual o trecho deve ser selecionado. Pode receber valores negativos. Neste caso a contagem dos caracteres deve começar da direita para a esquerda.</p><p>posicaoFinal é a posição final, até onde o trecho da string ou do array deve ser selecionado -1, isto é, posição excludente. Esse parâmetro é opcional. Pode receber valores negativos. Neste caso a contagem dos caracteres deve começar da direita para a esquerda.</p><h5>Valor de retorno</h5><p>É retornada a nova string ou o novo array selecionado.</p>',
		},
	},
];

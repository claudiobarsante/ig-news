import Link from 'next/link';
import { convertDateTime } from 'utils/convertDateTime';
import styles from 'templates/Posts/posts.module.scss';
import { LoadMorePosts_posts } from 'graphql/generated/LoadMorePosts';
import { memo } from 'react';
import { lastSeenVar, PostSeen } from 'graphql/lib/apolloCache';

type Props = {
	postContent: LoadMorePosts_posts;
};

export const createLastSeenPostEntry = (postSeen: PostSeen) => {
	return { slug: postSeen.slug, name: postSeen.name };
};

const PostPreviewComponent = ({ postContent }: Props) => {
	const { updatedAt, slug, name, content } = postContent;

	const convertedTime = convertDateTime(updatedAt);
	const formatedContent = `${content.html.slice(0, 300)}...`;

	const handleUpdateLastPostsSeen = () => {
		const lastSeen = lastSeenVar();
		const newEntry = createLastSeenPostEntry({ slug, name });
		lastSeenVar(lastSeen.concat([newEntry]));
	};

	return (
		<>
			<Link href={`/post/${slug}`}>
				<a className={styles['post-link']} onClick={() => handleUpdateLastPostsSeen()}>
					<time className={styles['post-link__time']}>{convertedTime}</time>
					<strong className={styles['post-link__title']}>{name}</strong>

					<div
						className={styles['post__content']}
						dangerouslySetInnerHTML={{ __html: formatedContent }}
					/>
				</a>
			</Link>
		</>
	);
};

export const PostPreview = memo(PostPreviewComponent, (previousProps, nextProps) => {
	return Object.is(previousProps.postContent, nextProps.postContent);
});

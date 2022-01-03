import Link from 'next/link';
import ConvertDateTime from 'utils/convertDateTime';
import styles from 'styles/pages/posts.module.scss';
import { LoadMorePosts_posts } from 'graphql/generated/LoadMorePosts';
import { memo } from 'react';

type Props = {
	postContent: LoadMorePosts_posts;
};
const PostPreviewComponent = ({ postContent }: Props) => {
	const { updatedAt, slug, name, content } = postContent;
	const convertedTime = ConvertDateTime(updatedAt);
	const formatedContent = `${content.html.slice(0, 300)}...`;
	return (
		<Link key={slug} href={`/post/${slug}`}>
			<a className={styles['post-link']}>
				<time className={styles['post-link__time']}>{convertedTime}</time>
				<strong className={styles['post-link__title']}>{name}</strong>

				<div
					className={styles['post__content']}
					dangerouslySetInnerHTML={{ __html: formatedContent }}
				/>
			</a>
		</Link>
	);
};

export const PostPreview = memo(PostPreviewComponent, (previousProps, nextProps) => {
	return Object.is(previousProps.postContent, nextProps.postContent);
});

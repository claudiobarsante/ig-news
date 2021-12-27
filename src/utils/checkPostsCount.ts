export function checkPostsCount(totalPosts: number, currentPosts: number) {
	/*Graphcms has this property postsConnection that returns the total number of posts.
	return data?.postsConnection.aggregate.count > data?.posts.length
	So just compare the total x current number of posts. If they are equal there's no more posts tos how */
	return totalPosts > currentPosts;
}

export default function test() {
	console.log('sdfsdf');
}

export function qq() {
	console.log('sdf');
}

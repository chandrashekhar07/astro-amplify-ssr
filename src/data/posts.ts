export interface Post {
	slug: string;
	title: string;
	body: string;
}

// Stand-in for a database or CMS. Pages look posts up at request time.
export const posts: Post[] = [
	{
		slug: 'hello-world',
		title: 'Hello, world',
		body: 'This page is rendered on demand by the Amplify compute function.',
	},
	{
		slug: 'dynamic-routes',
		title: 'Dynamic routes',
		body: 'src/pages/posts/[slug].astro has no getStaticPaths, so any slug is resolved per request.',
	},
	{
		slug: 'deploying-to-amplify',
		title: 'Deploying to Amplify',
		body: 'astro-aws-amplify writes .amplify-hosting/, which Amplify Hosting deploys as static assets + a Node.js compute.',
	},
];

export function getPost(slug: string | undefined): Post | undefined {
	return posts.find((post) => post.slug === slug);
}

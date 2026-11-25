// @ts-check
import { defineConfig } from 'astro/config';
import awsAmplify from 'astro-aws-amplify';

// https://astro.build/config
export default defineConfig({
	// Every page is rendered on demand (SSR) by the Amplify compute function.
	output: 'server',
	// Amplify Hosting supports nodejs20.x | nodejs22.x | nodejs24.x (adapter default: nodejs22.x)
	adapter: awsAmplify({ runtime: 'nodejs24.x' }),
});

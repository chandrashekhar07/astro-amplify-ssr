import type { APIRoute } from 'astro';

// Server endpoint: GET /api/time
export const GET: APIRoute = () => {
	return Response.json({
		now: new Date().toISOString(),
		random: Math.random(),
	});
};

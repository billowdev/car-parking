/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		baseURL: process.env.NEXT_PUBLIC_CAR_PARIKING_API_URL,
		accessTokenKey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY,
		refreshTokenKey: process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY,
	}
};

export default nextConfig;

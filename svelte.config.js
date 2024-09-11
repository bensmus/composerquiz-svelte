import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
            fallback: '200.html' // https://surge.sh/help/adding-a-200-page-for-client-side-routing
        })
	}
};

export default config;

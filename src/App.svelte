<script>
	import { onMount } from 'svelte';
	import { GET } from './http/tumblr-api';
	import Slideshow from './components/Slideshow.svelte';

	let imageList = null;

	const parseResponse = (response) => {
		const posts = response['response']['posts'];
		imageList = posts
			.filter((post) => {
				return !!post.photos[0] && post.photos[0].alt_sizes;
			})
			.map((post) => {
				return {
					id: post.id,
					src: post.photos[0].original_size.url,
					thumbnail: post.photos[0].alt_sizes.find(
						(altSize) =>
							altSize.height >= 100 && altSize.height <= 250
					).url,
					alt: post.summary,
				};
			});
	};

	onMount(async () => {
		const response = await GET('posts/photo');
		if (response) {
			parseResponse(response);
		}
	});

</script>

<main class='pure-u-3-3'>
	{#if !!imageList}
		<Slideshow {imageList} />
	{:else}
		<p class="noimages">No Images available.</p>
	{/if}
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		margin: 0 auto;
		padding: 0;
		height: 80vh;
		width: 100vw;
	}
	.noimages{
		vertical-align: center;
		margin: 25%;
		font-size: x-large;
	}
</style>

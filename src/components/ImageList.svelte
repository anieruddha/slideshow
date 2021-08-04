<script>
    import { createEventDispatcher } from 'svelte';

    export let imageList = [];
    export let currentImageId = null;
    
    const dispatch = createEventDispatcher();
    const imageClick = (imageId) => dispatch('click', imageId);
</script>

<div>
    {#each imageList as image}
        <img
            id={image.id}
            src={image.thumbnail}
            alt={image.text}
            on:click={() => imageClick(image.id)}
            class='pure-img'
            class:current={image.id === currentImageId}
        />
    {/each}
</div>
<style>
    div {
        display: flex;
        flex-direction: row;
        overflow-y: hidden;
        overflow-x: scroll;
        max-height: 20%;
    }
    img {
        margin: 0 0.2em;
        max-height: 80%;
    }
    .current {
        border: 5px solid;
    }
</style>

<script>
    import ImageViewer from './ImageViewer.svelte';
    import ImageList from './ImageList.svelte';

    export let imageList = [];

    $: curImg = imageList.find((e) => !!e);
    $: curIdx = imageList.findIndex((e) => e.id === curImg.id);

    $: {
        if(!!curImg){
            imageList
            const curEle = document.getElementById(curImg.id);
            if(!!curEle) curEle.scrollIntoView();
        }
    }

    const changeImage = (event) =>
        (curImg = imageList.find((e) => e.id == event.detail));

    const nextImage = (event) => {
        if(curIdx < imageList.length-1){
            curImg = imageList[curIdx+1];
        }
    }

    const prevImage = (event) => {
        if(curIdx > 0){
            curImg = imageList[curIdx-1];
        }
    }
</script>

<div>
    {#if curImg}
        <ImageViewer bind:src={curImg.src} alt={curImg.alt} on:next={nextImage} on:prev={prevImage} isPrev={curIdx > 0} isNext={curIdx < imageList.length -1}/>
        <br/>
        <ImageList bind:imageList on:click={changeImage} currentImageId={curImg.id}/>
    {/if}
</div>
<style>
    div {
        margin: 25px;
    }
</style>

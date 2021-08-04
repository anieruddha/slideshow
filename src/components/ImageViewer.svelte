<script>
    import { createEventDispatcher } from 'svelte';

    export let src;
    export let alt = 'Image Not Found';
    export let isNext = false;
    export let isPrev = false;

    const dispatch = createEventDispatcher();
    const goPrev = () => dispatch('prev');
    const goNext = () => dispatch('next');
    const keyboardNavigation = (event) => {
        switch (event.keyCode){
            case 37: goPrev();
            break;
            case 39: goNext();
            break;
        }
    }
</script>

<div>
    <a href={'#'} class='navigation left' on:click={goPrev} class:pure-button-disabled={!isPrev}>
        <i class='fa fa-angle-double-left'></i>
    </a>
    <div class='imageContainer'>
        <img {src} {alt} class='pure-img'/>
        <span>{alt}</span>
    </div>
    <a href={'#'} class='navigation right' on:click={goNext} class:pure-button-disabled={!isNext}>
        <i class='fa fa-angle-double-right'></i>
    </a>
</div>
<svelte:window on:keydown={keyboardNavigation}/>
<style>
    div {
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        margin: 0;
        vertical-align: top;
    }
    .imageContainer {
        width: 80vw;
    }
    .navigation{
        margin: 0 5px;
        font-size: xxx-large;
        height: 100%;
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        vertical-align: bottom;
    }
    .imageContainer img {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .imageContainer  span {
        position: absolute;
        bottom: 20px;
        mix-blend-mode: difference;
        width: 100%;
        color: #ffffff;
        font-size: large;
        text-align:left;
        margin: 10px;
    }
    .right {
        text-align: right;
    }
    .left {
        text-align: left;
    }
    i {
        cursor: pointer;
    }
    a {
        text-decoration: none;
    }
</style>
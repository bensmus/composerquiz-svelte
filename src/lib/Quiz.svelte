<script>
    import Selector from './Selector.svelte';
    import Spinner from './Spinner.svelte';
    import { fetch } from './fetcher/fetcher';

    /** @type {boolean[]} */
    export let epochMask;
    export let questionCount;

    let fetchPromise = fetch(epochMask);
    let playbackStarted = false; // Only enable selector once audio playback has started.
    let selectionMade = false; // Only enable next button after selection has been made.

    /**
     * @type {Selector}
    */
    let selector;
    function reset() {
        fetchPromise = fetch(epochMask);
        playbackStarted = false;
        selectionMade = false;
        selector.reset();
    }
</script>

<style>
    section {
        margin: 10px;
    }
    h1 {
        font-weight: normal;
    }
    :global(body) {
        max-width: 500px;
        margin: auto;
    }
    :global(.big-button) {
        width: 100%;
    }
    :global(button) {
        min-height: 5vmin;
    }
    #spinner-div {
        height: 70vh;
        display: flex;
        justify-content: center;
    }
    #spinner-div div {
        align-self: center;
    }
</style>

{#await fetchPromise}
<div id='spinner-div'>
    <div>
        <Spinner />
    </div>
</div>
{:then [correct, selections, workTitle, previewUrl, spotifyUrl]}
<section>
    <h1>Listen to piece excerpt</h1>
    <audio on:play={() => {playbackStarted = true}} controls id="audio" src={previewUrl}></audio>
</section>
<section>
    <h1>Select composer</h1>
    <Selector 
        disabledExternal={!playbackStarted}
        on:selection={event => {selectionMade = true; console.log(event.detail.selectionWasCorrect)}} 
        bind:this={selector}
        selections={selections} 
        correct={correct}
    />
</section>
<section>
    {#if !selectionMade}
        <h1>Composer: hidden</h1>
        <h1>Piece: hidden</h1>
    {:else}
        <h1>Composer: <a href="{'https://en.wikipedia.org/wiki/' + selections[correct]}" target='_blank'>{selections[correct]}</a></h1>
        <h1>Piece: <a href={spotifyUrl} target="_blank">{workTitle}</a></h1>
    {/if}
    <button 
        disabled={!selectionMade}
        class="big-button" on:click={reset}>
        Next
    </button>
</section>
{/await}
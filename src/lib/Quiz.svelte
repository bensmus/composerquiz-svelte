<script>
    import Selector from './Selector.svelte';
    import Spinner from './Spinner.svelte';
    import CenteredContainer from './CenteredContainer.svelte';
    import { fetch } from './fetcher/fetcher';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher(); // Quiz complete event.

    /** @type {boolean[]} */
    export let epochMask;
    /** @type {number }*/
    export let questionCount;

    let correctCount = 0;

    /** @returns {[number, string[], null, null, null]}*/
    function loadingVals() {
        return [-1, Array(4).fill('Loading...'), null, null, null]
    }

    let [correct, selections, workTitle, previewUrl, spotifyUrl] = loadingVals();
    /** @type {boolean} */
    let loading; // Whether or not to show the loading spinner.
    
    async function updateApiVals() {
        [correct, selections, workTitle, previewUrl, spotifyUrl] = loadingVals();
        loading = true;
        [correct, selections, workTitle, previewUrl, spotifyUrl] = await fetch(epochMask);
        loading = false;
    }
    
    updateApiVals();

    let playbackStarted = false; // Only enable selector once audio playback has started.
    let selectionMade = false; // Only enable next button after selection has been made.

    /**
     * @type {Selector}
    */
    let selector;
    async function nextQuestion() {
        selector.reset();
        if (currentQuestion == questionCount) { // Done the quiz:
            dispatch('quizdone', {correctCount: correctCount});
            currentQuestion = 1;
        } else {
            currentQuestion++;
        }
        playbackStarted = false;
        selectionMade = false;
        await updateApiVals();
    }

    let currentQuestion = 1; // Which question we are on right now. Humans count from 1.
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
    #question-info {
        width: min-content;
        margin: auto;
    }
</style>

{#if loading}
<CenteredContainer>
    <Spinner />
</CenteredContainer>
{/if}

<section>
    <h1>Listen to piece excerpt</h1>
    <audio on:play={() => {playbackStarted = true}} controls id="audio" src={previewUrl}></audio>
</section>
<section>
    <h1>Select composer</h1>
    <Selector 
        disabledExternal={!playbackStarted}
        on:selection={event => {
            selectionMade = true; 
            if (event.detail.selectionWasCorrect) {
                correctCount++;
            }
        }} 
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
        class="big-button" on:click={nextQuestion}>
        Next
    </button>
</section>
<section>
    <div id='question-info'>
        {currentQuestion}/{questionCount}
    </div>
</section>
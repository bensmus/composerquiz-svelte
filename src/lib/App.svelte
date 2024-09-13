<script>
    import Selector from './Selector.svelte';
    import { sample } from './util.js'
    
    const allSelections = ['Apple', 'Orange', 'Kiwi', 'Lemon', 'Potato', 'Avocado', 'Walnut'];
    /**
     * @returns {[string[], number, string]}
    */
    function fetch() {
        return [sample(allSelections, 4), Math.floor(Math.random() * 4), 'Etude'];
    }
    let [selections, correct, pieceName] = fetch();

    let playbackStarted = false; // Only enable selector once audio playback has started.
    let selectionMade = false; // Only enable next button after selection has been made.
    /**
     * @type {Selector}
    */
    let selector;
    function reset() {
       [selections, correct] = fetch();
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
</style>

<section>
    <h1>Listen to piece excerpt</h1>
    <audio on:play={() => {playbackStarted = true}} controls id="audio" src="https://p.scdn.co/mp3-preview/5aa90bffe7aed8678c5ae99ec4a56c46dd2ae2b2?cid=66a3d2ff0264486bb7e5e495cc712271"></audio>
</section>
<section>
    <h1>Select composer</h1>
    <Selector 
        disabled={!playbackStarted}
        on:selection={event => {selectionMade = true; console.log(event.detail.selectionWasCorrect)}} 
        bind:this={selector}
        selections={selections} 
        correct={correct}
    />
</section>
<section>
    <h1>Composer: {!selectionMade ? 'hidden' : selections[correct]}</h1>
    <h1>Piece: {!selectionMade ? 'hidden' : pieceName}</h1>
    <button 
        disabled={!selectionMade}
        class="big-button" on:click={reset}>
        Next
    </button>
</section>

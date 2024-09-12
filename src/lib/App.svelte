<script>
    import Selector from './Selector.svelte';
    import { sample } from './util.js'
    const allSelections = ['Apple', 'Orange', 'Kiwi', 'Lemon', 'Potato', 'Avocado', 'Walnut'];

    /**
     * @type {string[]}
     */
    let selections;
    /**
     * @type {number}
     */
    let correct;
    /**
     * @type {boolean}
     */
    let resetFlag;
    /**
     * @type {boolean}
     */
    let nextDisabled;
    function reset() {
       selections = sample(allSelections, 4);
       correct = 2;
       resetFlag = true;
       nextDisabled = true;
    }
    reset();
</script>

<Selector 
    on:selection={event => {nextDisabled = false; console.log(event.detail.selectionWasCorrect)}} 
    bind:resetFlag={resetFlag} 
    selections={selections} 
    correct={correct}
/>
<button disabled={nextDisabled} on:click={reset}>Next</button>
<script>
    import Selector from './Selector.svelte';
    import { sample } from './util.js'
    
    const allSelections = ['Apple', 'Orange', 'Kiwi', 'Lemon', 'Potato', 'Avocado', 'Walnut'];
    function newSelectionsAndCorrect() {
        return [sample(allSelections, 4), Math.floor(Math.random() * 4)];
    }
    let [selections, correct] = newSelectionsAndCorrect();
    let nextDisabled = true;
    /**
     * @type {Selector}
    */
    let selector;
    function reset() {
       [selections, correct] = newSelectionsAndCorrect();
       nextDisabled = true;
       selector.reset();
    }
</script>

<Selector 
    on:selection={event => {nextDisabled = false; console.log(event.detail.selectionWasCorrect)}} 
    bind:this={selector}
    selections={selections} 
    correct={correct}
/>
<button disabled={nextDisabled} on:click={reset}>Next</button>
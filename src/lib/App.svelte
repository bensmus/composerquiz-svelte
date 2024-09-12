<script>
    import Selector from './Selector.svelte';
    import { sample } from './util.js'
    import { onMount } from 'svelte';
    const allSelections = ['Apple', 'Orange', 'Kiwi', 'Lemon', 'Potato', 'Avocado', 'Walnut'];
    /**
     * @type {Selector}
     */
    let selector;
    function resetSelector() {
        return selector.reset(sample(allSelections, 4), Math.floor(Math.random() * 4))
    }
    onMount(() => {
        resetSelector()
    })
</script>

<Selector bind:this={selector}/>
<button on:click={() => {console.log('selected', resetSelector())}}>Next</button>
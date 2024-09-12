<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    /**
     * @type {number | null}
     */
    let currentSelection = null; // What button is selected.
    let selectionMade = false; // Has the select button been clicked?
    
    /**
     * @type {boolean}
     */
    export let resetFlag;
    export let selections;
    export let correct;

    $: if (resetFlag === true) {
        currentSelection = null;
        selectionMade = false;
        resetFlag = false;
    }


</script>

<style>
    button.selected {
        background-color: blue;
    }
    button.correct {
        background-color: green;
    }
    button.wrong {
        background-color: red;
    }
</style>

<!-- Choice buttons -->
<div>
    {#each {length: selections.length} as _, i}
        {#if !selectionMade}
            <!-- Choice buttons are interactive and can be selected -->
            <button class:selected={currentSelection === i} on:click={() => currentSelection = i}>
                {selections[i]}
            </button>
        {/if}
        {#if selectionMade}
            <!-- Choice buttons are non-interactive and show the correct and wrong choice -->
            <button class:correct={i === correct} class:wrong={i === currentSelection && i !== correct}>
                {selections[i]}
            </button>
        {/if}
    {/each}
</div>

<!-- Select button -->
<button 
    disabled={currentSelection === null || selectionMade} 
    on:click={() => {
        selectionMade = true;
        const selectionWasCorrect = currentSelection === correct;
        dispatch('selection', {selectionWasCorrect: selectionWasCorrect})
    }}>
    Select
</button>
<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher(); // Selection event.

    export let selections;
    export let correct;
    export let disabledExternal; // Boolean prop to disable or enable the selector.

    /**
     * @type {number | null}
     */
    let currentSelection = null; // What button is selected.
    let selectionMade = false; // Has the select button been clicked?

    export function reset() {
        currentSelection = null;
        selectionMade = false;
    }
</script>

<style>
    button.selected {
        background-color: lightblue;
    }
    button.correct {
        background-color: lightgreen;
    }
    button.wrong {
        background-color: #FFCCCB ;
    }
    #choice-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 10px;
    }
</style>

<!-- Choice buttons -->
<div id="choice-buttons">
    {#each {length: selections.length} as _, i}
        {#if !selectionMade}
            <!-- Choice buttons are interactive and can be selected -->
            <button class:selected={currentSelection === i} on:click={() => currentSelection = i} disabled={disabledExternal}>
                {selections[i]}
            </button>
        {/if}
        {#if selectionMade}
            <!-- Choice buttons are non-interactive and show the correct and wrong choice -->
            <button class={i === currentSelection ? (i === correct ? 'correct' : 'wrong') : ''} disabled={true}>
                {selections[i]}
            </button>
        {/if}
    {/each}
</div>

<!-- Select button -->
<button 
    class="big-button"
    disabled={currentSelection === null || selectionMade} 
    on:click={() => {
        selectionMade = true;
        const selectionWasCorrect = currentSelection === correct;
        dispatch('selection', {selectionWasCorrect: selectionWasCorrect})
    }}>
    Select
</button>
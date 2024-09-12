<script>
    // Values set by parent component through reset function.
    let selections = ['', '', '', ''];
    let correct = -1;

    // Values are the state of the component.
    /**
     * @type {number | null}
     */
    let currentSelection = null; // What button is selected.
    let selectionMade = false; // Has the select button been clicked?

    /**
     * Resets the state and passes in newSelections, newCorrect from parent.
     * Returns the selected value.
     * 
     * @param {string[]} newSelections
     * @param {number} newCorrect
     */
    export function reset(newSelections, newCorrect) {
        correct = newCorrect
        selections = newSelections;
        const oldSelection = currentSelection;
        currentSelection = null;
        selectionMade = false;
        return oldSelection;
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
<button on:click={() => selectionMade = true}>select</button>
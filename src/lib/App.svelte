<script>
    import { epochs } from './fetcher/openopus';
    import Quiz from './Quiz.svelte';
    import CenteredContainer from './CenteredContainer.svelte';

    let epochsSelected = [...epochs];
    let questionCount = 10;

    let step = 'start'; // Either 'start', 'quiz', or 'result'.
    let correctCount = 0;

    $: accuracy = correctCount / questionCount;
    $: reactionToAccuracy = 
        accuracy < 0.25 ? 'Unlucky.' :
        accuracy < 0.5 ? 'Good.' :
        accuracy < 0.75 ? 'Impressive!' : 'Majestic 👑';
</script>

<style>
    :global(section) {
        margin: 10px;
    }
    :global(h1) {
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
        min-height: 7vmin;
    }
</style>

{#if step == 'start'}
    <section>
        <h1>Select composer epochs</h1>
        {#each epochs as epoch}
            <div>
                <input 
                    type="checkbox" 
                    name="epochs" 
                    value={epoch}
                    bind:group={epochsSelected}
                />
                {epoch}
            </div>
        {/each}
    </section>
    <section>
        <h1>Select number of questions</h1>
        {#each [10, 15, 20] as n}
            <div>
                <input 
                    type="radio"
                    name="question-count"
                    value={n}
                    bind:group={questionCount}
                />
                {n}
            </div>
        {/each}
    </section>
    <section>
        <button
            disabled={epochsSelected.length === 0}
            on:click={() => {step = 'quiz'}}
        >
            Start Quiz
        </button>
    </section>
{/if}
{#if step == 'quiz'}
    <Quiz 
        on:quizdone={event => {
            step = 'result';
            correctCount = event.detail.correctCount;
        }} 
        epochsSelected={epochsSelected} 
        questionCount={questionCount}
    />
{/if}
{#if step == 'result'}
    <CenteredContainer>
        <div>
            <div>Score: {correctCount}/{questionCount}</div>
            <div><i>{reactionToAccuracy}</i></div>
            <br>
            <button on:click={() => {step = 'start';}}>New Quiz</button>
        </div>
    </CenteredContainer>
{/if}
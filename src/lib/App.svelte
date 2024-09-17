<script>
    import { epochs } from './fetcher/openopus';
    import Quiz from './Quiz.svelte';
    import CenteredContainer from './CenteredContainer.svelte';

    /** @type{boolean[]} */
    let epochMask = new Array(epochs.length).fill(true);
    let showQuiz = true;
    let correctCount = 0;
</script>

{#if showQuiz}
    <Quiz 
        on:quizdone={event => {
            showQuiz = false;
            correctCount = event.detail.correctCount;
        }} 
        epochMask={epochMask} 
        questionCount={10}
    />
{:else}
    <CenteredContainer>
        <div>
            <p>Got {correctCount} correct.</p>
            <button on:click={() => {showQuiz = true;}}>Play again</button>
        </div>
    </CenteredContainer>
{/if}
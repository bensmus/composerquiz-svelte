<script>
    import { epochs } from './fetcher/openopus';
    import Quiz from './Quiz.svelte';

    /** @type{boolean[]} */
    let epochMask = new Array(epochs.length).fill(true);
</script>

<Quiz epochMask={epochMask} questionCount={10}/>
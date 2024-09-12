/**
 * @param {any[]} array
 * @param {number} count
 */
export function sample(array, count) {
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    /**
     * @param {any[]} array
     */
    function shuffle(array) {
        let currentIndex = array.length;
    
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
    
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }

    const copiedArray = [...array]
    shuffle(copiedArray)
    return copiedArray.slice(0, count)
}
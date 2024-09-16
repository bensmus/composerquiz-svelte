/**
 * @param {number} minVal 
 * @param {number} bound 
 * 
 * `randInt(2, 5)` could return either 2, 3, or 4.
 */
function randInt(minVal, bound) {
    return Math.floor(Math.random() * (bound - minVal)) + minVal;
}

/**
 * @param {Map<any, number>} distrib 
 * @param {number} count 
 * 
 * Sample an unormalized distribution without replacement.
 * `sampleDistrib({'cat': 0, 'dog': 10, 'bird': 5}, 2)` gives `['dog', 'bird']` in some order.
 */
export function sampleDistrib(distrib, count) {
    if (count > distrib.size) {
        throw new Error('Sampling more elements than are present in the distribution.');
    }

    /**
     * @param {Map<any, number>} distrib 
     */
    function sampleOne(distrib) {
        const sumOfVals = Array.from(distrib.values()).reduce((partialSum, a) => partialSum + a, 0);
        const randPosInDistrib = randInt(0, sumOfVals);
        let currentPos = 0;
        for (const [key, value] of distrib.entries()) {
            currentPos += value;
            if (currentPos > randPosInDistrib) {
                return key;
            }
        }
        throw new Error('Check for empty distribution or 0 probability.');
    }

    const sampled = []
    const distribCopy = new Map(distrib)
    for (const _ of Array(count)) {
        const sample = sampleOne(distribCopy)
        sampled.push(sample)
        distribCopy.delete(sample)
    }

    return sampled
}

/**
 * @param {any[]} array 
 * @param {number} count 
 */
export function sampleArray(array, count) {
    /**
     * @type {Map<any, number>}
     */
    const distrib = new Map();
    for (const elem of array) {
        distrib.set(elem, 1)
    }

    return sampleDistrib(distrib, count);
}
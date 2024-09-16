import { sampleDistrib, sampleArray, randInt } from '$lib/util';
import axios from 'axios';

const openopusBaseUrl = 'https://api.openopus.org/';

// Epoch and how many composers of that epoch exist in the database.

export const epochs = [
    'Medieval', 'Renaissance', 'Baroque', 'Classical', 'Early Romantic', 'Romantic', 'Late Romantic',
    '20th Century', 'Post-War', '21st Century'
]

const epochComposerCounts = [
    4, 17, 22, 9, 13, 36, 39, 49, 27, 4
]

/**
 * @param {boolean[]} epochMask 
 * @returns {Map<string, number>}
 */
function makeEpochDistrib(epochMask) {
    const epochDistrib = new Map();
    for (let i = 0; i < epochs.length; i++) {
        if (epochMask[i]) {
            epochDistrib.set(epochs[i], epochComposerCounts[i]);
        }
    }
    return epochDistrib;
}

/**
 * Return array of composer objects, which have name and id attributes, among others.
 * 
 * @param {string} epoch 
 * @returns {Promise<Object[]>}
 */
async function fetchComposers(epoch) {
    const composerUrl = openopusBaseUrl + `composer/list/epoch/${epoch}.json`;
    const response = await axios.get(composerUrl);
    return response.data.composers;
}

/**
 * Return array of work objects, which have title attribute, among others.
 * 
 * @param {number} composerId 
 * @returns {Promise<Object[]>}
 */
async function fetchWorks(composerId) {
    const worksUrl = openopusBaseUrl + `work/list/composer/${composerId}/genre/all.json`;
    const response = await axios.get(worksUrl);
    return response.data.works;
}

/**
 * Fetch [correct, selections, workTitle] from the OpenOpus API.
 * Sample 4 composers from epoch.
 * Sample work from correct composer.
 * 
 * @param {boolean[]} epochMask 
 */
export async function fetchComposersAndWork(epochMask) {
    const epochDistrib = makeEpochDistrib(epochMask);
    const epoch = sampleDistrib(epochDistrib, 1)[0];
    const composersObjsAll = await fetchComposers(epoch);
    const composerObjs = sampleArray(composersObjsAll, 4);
    const selections = composerObjs.map(obj => obj.complete_name);
    const correct = randInt(0, 4);
    const correctId = composerObjs[correct].id;
    const worksObjs = await fetchWorks(correctId);
    const workTitle = sampleArray(worksObjs, 1)[0].title;
    return [correct, selections, workTitle];
}
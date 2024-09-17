import { fetchComposersAndWork } from './openopus';
import { fetchWorkTitleAndUrls } from './spotify';

/** @param {string[]} epochsSelected  */
export async function fetch(epochsSelected) {
    while (true) {
        const [correct, selections, queryWorkTitle] = await fetchComposersAndWork(epochsSelected);
        const spotifyResponse = await fetchWorkTitleAndUrls(selections[correct], queryWorkTitle);
        if (spotifyResponse) {
            return [correct, selections, ...spotifyResponse];
        }
        // Retry the whole thing, because Spotify has no valid hits for that composer-piece combo.
    }
}
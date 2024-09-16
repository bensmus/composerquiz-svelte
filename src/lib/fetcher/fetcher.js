import { fetchComposersAndWork } from './openopus';
import { fetchWorkTitleAndUrls } from './spotify';

/** @param {boolean[]} epochMask  */
export async function fetch(epochMask) {
    while (true) {
        const [correct, selections, queryWorkTitle] = await fetchComposersAndWork(epochMask);
        const spotifyResponse = await fetchWorkTitleAndUrls(selections[correct], queryWorkTitle);
        if (spotifyResponse) {
            return [correct, selections, ...spotifyResponse];
        }
        // Retry the whole thing, because Spotify has no valid hits for that composer-piece combo.
    }
}
import axios from 'axios';
import unidecode from 'unidecode';

const spotifyBaseUrl = 'https://api.spotify.com';

async function newToken() {
    const tokenUrl = 'https://v4m134dlpi.execute-api.us-west-2.amazonaws.com/refreshSpotifyAuthToken';
    const response = await axios.get(tokenUrl);
    const token = response.data;
    console.log(token);
    return token;
}

/**
 * @param {string} query 
 * @param {string} token 
 */
async function spotifySearch(query, token) {
    const searchUrl = spotifyBaseUrl + '/v1/search';
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: query,
            type: 'track',
            limit: 50
        }
    };
    const response = await axios.get(searchUrl, config);
    return response;
}

/** 
 * Check that fullName1 and fullName2 refer to the same composer.
 * Look at last name and first letter of string.
 * 
 * E.g. 
 * ("Béla Bartók", "Bela Bartok") => true
 * ("Mikhail Ivanovich Glinka", "Mikhail Glinka") => true
 * ("C.P.E Bach, J.S. Bach") => false
 * 
 * @param {string} fullName1 
 * @param {string} fullName2 
 */
function composerNameCheck(fullName1, fullName2) {
    fullName1 = unidecode(fullName1);
    fullName2 = unidecode(fullName2);
    const firstLetter1 = fullName1[0];
    const firstLetter2 = fullName2[0];
    const array1 = fullName1.split(' ');
    const lastName1 = array1[array1.length - 1];
    const array2 = fullName2.split(' ');
    const lastName2 = array2[array2.length - 1];

    const checkSuccess = firstLetter1 == firstLetter2 && lastName1 == lastName2;
    if (!checkSuccess) {
        console.warn(`${fullName1} distinct from ${fullName2}`);
    }
    return checkSuccess;
}

/**
 * In the scenario that the `workTitle` is not available on Spotify with a preview URL,
 * the function will return a different `workTitle` from `queryWorkTitle`.
 * 
 * @param {string} composer
 * @param {string} queryWorkTitle
 */
export async function fetchWorkTitleAndUrls(composer, queryWorkTitle) {
    const token = await newToken();
    const query = `${queryWorkTitle} by ${composer}`;
    const response = await spotifySearch(query, token);
    const items = response.data.tracks.items;

    for (const item of items) {
        let itemComposerOk = false;
        for (const artist of item.artists) {
            if (composerNameCheck(artist.name, composer)) {
                itemComposerOk = true;
                break;
            }
        }
        if (itemComposerOk && item.preview_url) {
            return [item.name, item.preview_url, item.external_urls.spotify];
        }
    }
    // From Spotify's search results, there was no tracks
    // with the composer listed as an artist and with a preview url.
    // This is possible if the composer and work are not well-known.
    return null;
}
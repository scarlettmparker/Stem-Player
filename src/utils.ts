import { API_BASE_URL } from "./utils/consts";

/**
 * @param directory Directory to search for songs.
 * @returns JSON, list of stems (files) for a song.
 */
const getStems = async (directory: string) => {
    try {
        const res = await fetch(`${API_BASE_URL}/getsongs?dir=${directory}`);
        if (!res.ok) {
            throw new Error('Failed to fetch songs');
        }
        const data = await res.json();
        return Object.values(data);
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

export default getStems;
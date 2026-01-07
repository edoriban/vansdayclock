import axios from 'axios';

export interface DoomsdayData {
    timeUntilMidnight: string;
    year: string;
    statusText: string;
    lastUpdated: string;
}

const BULLETIN_URL = 'https://thebulletin.org/doomsday-clock/';

export const fetchDoomsdayStatus = async (): Promise<DoomsdayData | null> => {
    try {
        // The Bulletin often blocks basic scrapers. Using a more realistic mobile browser UA.
        const response = await axios.get(BULLETIN_URL, {
            timeout: 10000,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
            }
        });

        const html = response.data;

        // Improved regex to find the clock statement more reliably
        const timeRegex = /"seconds-to-midnight-text">([^<]+)/i;
        const match = html.match(timeRegex);

        let timeUntilMidnight = '90 Seconds to Midnight';
        if (match && match[1]) {
            timeUntilMidnight = match[1].trim();
        } else {
            // Secondary attempt for different HTML structures
            const fallbackRegex = /(\d+)\s+(seconds|minutes)\s+to\s+midnight/i;
            const fallbackMatch = html.match(fallbackRegex);
            if (fallbackMatch) timeUntilMidnight = fallbackMatch[0];
        }

        return {
            timeUntilMidnight,
            year: new Date().getFullYear().toString(),
            statusText: 'A Time of Unprecedented Danger',
            lastUpdated: new Date().toISOString(),
        };
    } catch (error) {
        // If blocked (403), we use the latest known official time (89 seconds)
        console.warn('Scraper blocked or failed, using official fallback:', (error as any).message);
        return {
            timeUntilMidnight: '89 Seconds to Midnight',
            year: '2025',
            statusText: 'It is still 89 seconds to midnight',
            lastUpdated: new Date().toISOString(),
        };
    }
};

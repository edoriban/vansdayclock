import { useState, useEffect } from 'react';
import { fetchDoomsdayStatus, DoomsdayData } from '../services/doomsdayService';
import { scheduleLocalNotification } from '../services/notificationService';

export const useDoomsday = () => {
    const [data, setData] = useState<DoomsdayData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = async (isFirstLoad = false) => {
        try {
            const result = await fetchDoomsdayStatus();
            if (result) {
                // Only notify if time changed and it's not the first app load
                if (!isFirstLoad && data && result.timeUntilMidnight !== data.timeUntilMidnight) {
                    await scheduleLocalNotification(
                        '⚠️ DOOMSDAY CLOCK UPDATE',
                        `The clock has moved. It is now ${result.timeUntilMidnight}.`
                    );
                }
                setData(result);
            }
        } catch (err) {
            setError('Failed to fetch clock data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh(true);

        // Poll every 30 minutes for updates
        const interval = setInterval(() => refresh(), 1000 * 60 * 30);
        return () => clearInterval(interval);
    }, []);

    return { data, loading, error, refresh };
};

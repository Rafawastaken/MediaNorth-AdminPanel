import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

/** devolve total de vídeos + contagem por status */
export function useVideoStats() {
    const [stats, setStats] = useState({
        total: 0, active: 0, paused: 0, deactive: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("customer_video")
                .select("video_status");

            if (error) { setError(error); setLoading(false); return; }

            const s = { total: data.length, active: 0, paused: 0, deactive: 0 };
            data.forEach(({ video_status }) => { s[video_status] += 1; });
            setStats(s);
            setLoading(false);
        })();
    }, []);

    return { stats, loading, error };
}

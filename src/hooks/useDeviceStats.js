import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

/**
 * Lê o nº total de TVs, quantas estão ativas (= active true)
 * e quantas estão inativas.
 */
export function useDeviceStats() {
    const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);

            /* traz só o campo active; é leve — ~1 KB p/ 1 000 linhas */
            const { data, error } = await supabase
                .from("device")
                .select("active");

            if (error) { setError(error); setLoading(false); return; }

            const active = data.filter((d) => d.active).length;
            const inactive = data.length - active;
            setStats({ total: data.length, active, inactive });
            setLoading(false);
        })();
    }, []);

    return { stats, loading, error };
}

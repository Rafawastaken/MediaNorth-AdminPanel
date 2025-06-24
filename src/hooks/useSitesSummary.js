// src/hooks/useSitesSummary.js
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

export function useSitesSummary() {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true); setError(null);

        /* puxa todas as TVs de cada site mas só id + active */
        const { data, error } = await supabase
            .from("site")
            .select(`
        *,
        device:device ( id, active )
      `)
            .order("created_at", { ascending: false });

        if (error) { setError(error); setLoading(false); return; }

        /* gera as contagens que o card precisa */
        const mapped = data.map((s) => {
            const total = s.device?.length ?? 0;
            const active = s.device?.filter((d) => d.active).length ?? 0;
            const off = total - active;

            return {
                ...s,
                totalDevices: total,
                activeDevices: active,
                offDevices: off,
            };
        });
        console.log(mapped)
        setSites(mapped);
        setLoading(false);
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    return { sites, loading, error, refetch: fetchData };
}

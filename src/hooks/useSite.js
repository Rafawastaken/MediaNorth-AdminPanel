import { useState, useEffect, useCallback } from "react";
import { supabase } from "../libs/supabase";

/**
 * Lê um site pelo id  ➜  devolve { site, loading, error, updateSite }
 */
export function useSite(idSite) {
    const [site, setSite] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* ---------- fetch único ---------- */
    const fetchSite = useCallback(async () => {
        if (!idSite) return;

        setLoading(true);
        const { data, error } = await supabase
            .from("site")
            .select("*")
            .eq("id", idSite)
            .single();

        setSite(data);
        setError(error);
        setLoading(false);
    }, [idSite]);

    useEffect(() => { fetchSite(); }, [fetchSite]);

    /* ---------- UPDATE ---------- */
    const updateSite = useCallback(
        async (fields) => {
            const { error } = await supabase
                .from("site")
                .update(fields)
                .eq("id", idSite);

            if (error) throw error;
            await fetchSite();              // refresca cache local
        },
        [idSite, fetchSite]
    );

    return { site, loading, error, updateSite };
}

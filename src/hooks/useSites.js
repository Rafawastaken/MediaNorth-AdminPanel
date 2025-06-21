import { useCallback, useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

/**
 * Hook para ler, adicionar ou refazer a cache de sites.
 *
 * @returns {object} {
 *   sites,        // array com registos
 *   loading,      // boolean
 *   error,        // Error | null
 *   addSite,      // async fn(payload)
 *   refetch       // async fn()  ← força nova consulta
 * }
 */
export function useSites() {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /** Lê todos os sites activos */
    const fetchSites = useCallback(async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("site")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) setError(error);
        else setSites(data);

        setLoading(false);
    }, []);

    /** Insere um novo site e faz re-fetch */
    const addSite = useCallback(async (payload) => {
        const { error } = await supabase
            .from("site")
            .insert(payload);

        if (error) throw error;        // componente decide como mostrar
        await fetchSites();            // actualiza cache local
    }, [fetchSites]);

    // Primeiro carregamento
    useEffect(() => { fetchSites(); }, [fetchSites]);

    return { sites, loading, error, addSite, refetch: fetchSites };
}

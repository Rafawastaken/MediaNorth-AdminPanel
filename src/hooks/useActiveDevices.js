// src/hooks/useActiveDevices.js
import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

export function useActiveDevices() {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);

            // Seleciona todos os dispositivos com active = true
            // e faz join na tabela `site` para buscar o nome do site
            const { data, error } = await supabase
                .from("device")
                .select(`
          *,
          site:site_id (
            id,
            name
          )
        `)
                .eq("active", true);

            if (error) {
                setError(error);
                setDevices([]);
            } else {
                // Normaliza para um array onde cada device.site contém { id, name }
                setDevices(
                    data.map((d) => ({
                        ...d,
                        siteName: d.site?.name ?? "—",
                    }))
                );
            }

            setLoading(false);
        })();
    }, []);

    return { devices, loading, error };
}

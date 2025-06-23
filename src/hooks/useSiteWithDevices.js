// src/hooks/useSiteWithDevices.js
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

/**
 * Devolve:
 *   site  → dados da tabela site
 *   devices → array de TVs com a respectiva playlist ordenada
 */
export function useSiteWithDevices(idSite) {
    const [site, setSite] = useState(null);
    const [devices, setDevices] = useState([]);  // cada obj terá .playlist
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        /* ──────────────────────────────────────────────────────────────
           SELECT aninhado
           site
             └─ device (todas as TVs desse site)
                  └─ device_video (playlist)
                        └─ customer_video (vídeo + cliente)
        ────────────────────────────────────────────────────────────── */
        const { data, error } = await supabase
            .from("site")
            .select(
                `
        *,
        device:device (
          *,
          playlist:device_video (
            play_order,
            customer_video (
              id,
              video_url,
              customer!inner (
                id, name
              )
            )
          )
        )
        `
            )
            .eq("id", idSite)
            .single();                 // devolve só um site

        if (error) {
            setError(error);
            setLoading(false);
            return;
        }

        /* Ordena a playlist por play_order e remodela */
        const devicesWithPlaylist = (data.device ?? []).map((d) => ({
            ...d,
            playlist: (d.playlist ?? [])
                .sort((a, b) => a.play_order - b.play_order)
                .map((dv) => ({
                    order: dv.play_order,
                    video: dv.customer_video.video_url,
                    customer: dv.customer_video.customer,
                })),
        }));

        setSite({ ...data, device: undefined }); // tira o array para evitar duplicação
        setDevices(devicesWithPlaylist);
        setLoading(false);
    }, [idSite]);

    useEffect(() => {
        if (idSite) fetchData();
    }, [idSite, fetchData]);

    return { site, devices, loading, error };
}

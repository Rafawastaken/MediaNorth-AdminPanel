// src/hooks/useCustomerVideos.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../libs/supabase";

/**
 * Lê vídeos de um cliente com diferentes filtros de status (ativos, pausados, desativos).
 *
 * @param {string|number} customerId   – id do cliente
 */
export function useCustomerVideos(customerId) {
    const [allVideos, setAllVideos] = useState([]);
    const [loading, setLoad] = useState(true);
    const [error, setError] = useState(null);

    /* ---------- fetch ---------- */
    const fetchVideos = useCallback(async () => {
        if (!customerId) return;

        setLoad(true);
        setError(null);

        const { data, error } = await supabase
            .from("customer_video")
            .select(`
        id,
        video_url,
        video_title,
        video_duration,
        video_description,
        video_status,
        created_at,
        device_video(
          device_id,
          device(
            id,
            site_id,
            name,
            location
          )
        )
      `)
            .eq("customer_id", customerId);

        if (error) {
            setError(error);
            setLoad(false);
            return;
        }

        setAllVideos(data);
        setLoad(false);
    }, [customerId]);

    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    /* ---------- estatísticas (separando por status) ---------- */
    const stats = useMemo(() => {
        const activeVideos = allVideos.filter(v => v.video_status === "active");
        const pausedVideos = allVideos.filter(v => v.video_status === "paused");
        const deactiveVideos = allVideos.filter(v => v.video_status === "deactive");

        const total = allVideos.length;
        const active = activeVideos.length;
        const paused = pausedVideos.length;
        const deactive = deactiveVideos.length;

        const deviceSet = new Set();
        const siteSet = new Set();

        allVideos.forEach(v => {
            v.device_video?.forEach(link => {
                deviceSet.add(link.device_id);
                siteSet.add(link.device?.site_id);
            });
        });

        return {
            total,
            active,
            paused,
            deactive,
            devices: deviceSet.size,
            sites: siteSet.size,
        };
    }, [allVideos]);

    /* ---------- vídeos filtrados por status ---------- */
    const videos = useMemo(() => {
        const activeVideos = allVideos.filter(v => v.video_status === "active");
        const pausedVideos = allVideos.filter(v => v.video_status === "paused");
        const deactiveVideos = allVideos.filter(v => v.video_status === "deactive");

        return {
            allVideos,
            activeVideos,
            pausedVideos,
            deactiveVideos,
        };
    }, [allVideos]);

    /* ---------- retorno ---------- */
    return { videos, stats, loading, error, refetch: fetchVideos };
}

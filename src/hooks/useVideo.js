import { useState, useEffect, useCallback } from "react";
import { supabase } from "../libs/supabase";

/** Lê um vídeo (customer_video) e permite actualizá-lo */
export function useVideo(idVideo) {
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* ---------- fetch único ---------- */
    const fetchVideo = useCallback(async () => {
        if (!idVideo) return;

        setLoading(true);
        const { data, error } = await supabase
            .from("customer_video")
            .select(`
        *,
        device_video (
          device_id,
          device ( id, name, location, site_id )
        )
      `)
            .eq("id", idVideo)
            .single();

        setVideo(data);
        setError(error);
        setLoading(false);
    }, [idVideo]);

    useEffect(() => { fetchVideo(); }, [fetchVideo]);

    /* ---------- UPDATE ---------- */
    const updateVideo = useCallback(
        /**
         * @param {{videoUrl:string,videoTitle:string,videoDescription:string,
         *          videoDuration:string|number,videoStatus:string,
         *          deviceIds:string[]}}
         */
        async (fields) => {
            const {
                videoUrl,
                videoTitle,
                videoDescription,
                videoDuration,
                videoStatus,
                deviceIds,
            } = fields;

            /* 1) actualizar customer_video ----------------------- */
            const { error: errUpd } = await supabase
                .from("customer_video")
                .update({
                    video_url: videoUrl.trim(),
                    video_title: videoTitle.trim(),
                    video_description: videoDescription.trim(),
                    video_duration: String(videoDuration),
                    video_status: String(videoStatus),
                })
                .eq("id", idVideo);

            if (errUpd) throw errUpd;

            /* 2) device_video ------------------------------------ */
            await supabase                    // apaga ligações antigas
                .from("device_video")
                .delete()
                .eq("customer_video_id", idVideo);

            const inserts = deviceIds.map(async (deviceId) => {
                const { data: last } = await supabase  // último play_order
                    .from("device_video")
                    .select("play_order")
                    .eq("device_id", deviceId)
                    .order("play_order", { ascending: false })
                    .limit(1)
                    .maybeSingle();

                const nextOrder = (last?.play_order ?? -1) + 1;

                return supabase.from("device_video").insert({
                    device_id: deviceId,
                    customer_video_id: idVideo,
                    play_order: nextOrder,
                });
            });

            const res = await Promise.all(inserts);
            const failed = res.find((r) => r.error);
            if (failed?.error) throw failed.error;

            await fetchVideo();               // refresca cache local
        },
        [idVideo, fetchVideo]
    );

    return { video, loading, error, updateVideo };
}

import { supabase } from "../libs/supabase";

/**
 * Guarda um vídeo do cliente e distribui-o pelas TVs escolhidas.
 *
 * @param {number}   customerId                 ID do cliente
 * @param {object}   payload
 * @param {string}   payload.videoUrl
 * @param {string}   payload.videoTitle
 * @param {string}   payload.videoDescription
 * @param {string|number} payload.videoDuration
 * @param {string[]} payload.deviceIds          Array de IDs das TVs destino
 *
 * @throws {Error}   Propaga o primeiro erro do Supabase
 */
export async function saveVideo(customerId, payload) {
    const {
        videoUrl,
        videoTitle,
        videoDescription,
        videoDuration,
        videoStatus,
        deviceIds,
    } = payload;

    /* 1) customer_video ------------------------------------------------ */
    const { data: cv, error: errCv } = await supabase
        .from("customer_video")
        .insert({
            video_url: videoUrl.trim(),
            video_title: videoTitle.trim(),
            video_description: videoDescription.trim(),
            video_duration: String(videoDuration),
            video_status: String(videoStatus),
            customer_id: customerId,
        })
        .select("id")
        .single();

    if (errCv) throw errCv;
    const customerVideoId = cv.id;

    /* 2) device_video (uma linha por TV) ------------------------------- */
    const inserts = deviceIds.map(async (deviceId) => {
        /* último play_order dessa TV */
        const { data: last } = await supabase
            .from("device_video")
            .select("play_order")
            .eq("device_id", deviceId)
            .order("play_order", { ascending: false })
            .limit(1)
            .maybeSingle();                       // null se não existir

        const nextOrder = (last?.play_order ?? -1) + 1;

        return supabase.from("device_video").insert({
            device_id: deviceId,
            customer_video_id: customerVideoId,
            play_order: nextOrder,
        });
    });

    /* aguarda todas as inserções */
    const results = await Promise.all(inserts);
    const failed = results.find((r) => r.error);

    if (failed?.error) throw failed.error;
}

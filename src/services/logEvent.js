// src/services/logEvent.js
import { supabase } from "../libs/supabase";

/**
 * Regista um evento no log.
 * @param {string}  type
 * @param {string}  summary
 * @param {object} [details]
 * @param {object} [context] – pode conter user_id, device_id, site_id, …
 */
export async function logEvent({ type, summary, details = {}, context = {} }) {
    try {
        /* 1) utilizador autenticado (pode ser sobreposto) */
        let userId = context.user_id;
        if (!userId) {
            const { data } = await supabase.auth.getUser();
            userId = data?.user?.id ?? null;
        }

        /* 2) separa campos reconhecidos ------------- */
        const { device_id, /* ← existe como coluna */
            ...extraCtx } = context;        // ← resto vai para JSON

        /* 3) payload final -------------------------- */
        const payload = {
            event_type: type,
            summary,
            details: { ...details, context: extraCtx }, // JSONB
            user_id: userId,
            device_id: device_id ?? null,
            ip_address: window?.__IP__ ?? null,
            user_agent: navigator.userAgent,
        };

        const { error } = await supabase.from("log_event").insert(payload);
        if (error) throw error;
    } catch (err) {
        console.error("Falhou gravação de log:", err);
        /* não propagamos para não bloquear o fluxo da app */
    }
}

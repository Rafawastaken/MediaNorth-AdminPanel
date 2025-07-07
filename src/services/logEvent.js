import { supabase } from "../libs/supabase";

/**
 * Regista um evento simples de log.
 *
 * @param {Object} opts
 * @param {string}  opts.type        – tipo de evento ('login', 'device_offline', …)
 * @param {string}  opts.summary     – texto curto
 * @param {Object}  [opts.details]   – payload extra (qualquer objecto)
 * @param {Object}  [opts.context]   – { user_id?, device_id?, site_id? … }
 */
export async function logEvent({ type, summary, details = null, context = {} }) {
    try {
        /* ─── 1) identifica utilizador autenticado ─── */
        let userId = context.user_id;                // deixa o caller sobrepor
        if (!userId) {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            userId = user?.id ?? null;
        }

        /* ─── 2) constrói payload ─── */
        const payload = {
            event_type: type,
            summary,
            details,
            ...context,         // device_id, site_id, … (se existirem)
            user_id: userId,
            ip_address: window?.__IP__ ?? null,        // se tiveres
            user_agent: navigator.userAgent,
        };

        /* ─── 3) grava ─── */
        const { error } = await supabase.from("log_event").insert(payload);
        if (error) throw error;
    } catch (err) {
        console.error("Falhou gravação de log:", err);
        // decide aqui se queres propagar o erro ou ignorar silentemente
    }
}

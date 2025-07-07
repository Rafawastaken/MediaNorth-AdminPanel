// src/components/blocks/LogsTableBlock.jsx
// -------------------------------------------------------------------
// “Atividade Recente” – mostra os 6 eventos mais recentes de log_event
// -------------------------------------------------------------------
import { useEffect, useState, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { Link } from "react-router-dom";
import { supabase } from "../../libs/supabase";

/* ───────── cor por tipo ─────────── */
const eventColor = {
  login: "#0ea5e9", // sky-500
  login_success: "#0ea5e9", // sky-500
  logout: "#0ea5e9",
  site_created: "#10b981", // emerald-500
  site_updated: "#3b82f6", // blue-500
  video_add: "#f59e0b", // amber-500
  video_update: "#fbbf24",
  device_offline: "#ef4444", // red-500
  default: "#64748b", // slate-500
};

/* ───────── label PT por tipo ─────── */
const eventLabel = {
  login: "Sessão iniciada",
  login_success: "Sessão iniciada",
  logout: "Sessão terminada",
  site_created: "Local criado",
  site_updated: "Local atualizado",
  video_add: "Vídeo adicionado",
  video_update: "Vídeo atualizado",
  customer_created: "Cliente criado",
  customer_edited: "Cliente atualizado",
  device_offline: "TV offline",
};

/* helper */
const labelFor = (t) => eventLabel[t] ?? t.replaceAll("_", " ");

export default function LogsTableBlock() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoad] = useState(true);
  const [error, setError] = useState(null);

  /* ---------- fetch ---------- */
  const fetchLogs = useCallback(async () => {
    setLoad(true);
    setError(null);

    const { data, error } = await supabase
      .from("log_event")
      .select("id, event_type, summary, created_at")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) setError(error);
    else setLogs(data);
    setLoad(false);
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  /* ---------- UI ---------- */
  return (
    <div className="mt-6 rounded-lg bg-white shadow-sm">
      <header className="flex items-center justify-between px-4 pt-4">
        <h2 className="text-2xl font-normal text-slate-900">
          Atividade Recente
        </h2>
        <Link
          to="/logs"
          className="text-sm text-gray-500 hover:text-gray-700 border-b border-transparent hover:border-gray-400"
        >
          Ver todos
        </Link>
      </header>

      <ul className="space-y-2 px-4 py-4">
        {loading && (
          <li className="py-10 text-center text-sm text-slate-500">
            A carregar…
          </li>
        )}

        {!loading && error && (
          <li className="py-10 text-center text-sm text-red-600">
            Erro a carregar logs
          </li>
        )}

        {!loading && !error && logs.length === 0 && (
          <li className="py-10 text-center text-sm text-slate-500">
            Sem eventos recentes
          </li>
        )}

        {logs.map((log) => {
          const color = eventColor[log.event_type] ?? eventColor.default;

          return (
            <li
              key={log.id}
              className="relative flex items-start justify-between rounded-lg bg-slate-50 py-4 pr-4"
            >
              {/* dot flush-left */}
              <span
                className="absolute left-5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: color }}
              />

              {/* texto */}
              <div className="flex min-w-0 flex-col pl-10 pr-4">
                {/* usa summary se existir, senão label normalizado */}
                <p className="truncate font-semibold text-slate-900">
                  {log.summary || labelFor(log.event_type)}
                </p>
                <p className="truncate text-sm text-slate-600">
                  {labelFor(log.event_type)}
                </p>
              </div>

              {/* “há X minutos” */}
              <span className="shrink-0 self-center pr-6 text-xs text-slate-500">
                {formatDistanceToNow(new Date(log.created_at), {
                  addSuffix: true,
                  locale: pt,
                })}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
